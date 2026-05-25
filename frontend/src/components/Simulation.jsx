import '../assets/simulations.css';
import SimulationGraph from '../components/ReactFlow';
import socket from '../services/socket.js';

import { useState, useEffect } from 'react';

import {
    Play,
    Pause,
    RotateCcw,
    StepForward,
    Cpu,
    ArrowRight,
    CircleSlash,
    BrainCircuit,
    Sparkles
} from 'lucide-react';

function Simulation(){

    const states =
        JSON.parse(
            localStorage.getItem('tm_states')
        ) || [];

    const transitions =
        JSON.parse(
            localStorage.getItem('tm_transitions')
        ) || [];

    const savedTape =
        JSON.parse(
            localStorage.getItem('tm_tape')
        ) || {
            input: '',
            blankSymbol: 'B',
            headPosition: 0
        };

    const initialState =
        states.find(
            state => state.initial
        );

    const [machineTape, setMachineTape] = useState([]);
    const [currentState, setCurrentState] = useState('');
    const [headPosition, setHeadPosition] = useState(0);
    const [executionLog, setExecutionLog] = useState([]);
    const [speed, setSpeed] = useState(1000); 
    const [running, setRunning] = useState(false);
    const [step, setStep] = useState(0);
    const [activeTransition, setActiveTransition] = useState(null);
    const [result, setResult] = useState(null);
    useEffect(() => {
        if (!socket.connected) return;

        socket.emit('set-speed', speed);
    }, [speed]);
    useEffect(() => {

        initializeMachine();

    }, []);

    const initializeMachine = () => {

        const generatedTape = (
            savedTape.blankSymbol.repeat(10) +
            savedTape.input +
            savedTape.blankSymbol.repeat(15)
        ).split('');

        setMachineTape(generatedTape);

        setHeadPosition(
            savedTape.headPosition + 10
        );

        setCurrentState(
            initialState
                ? initialState.name
                : ''
        );

        setStep(0);

        setResult(null);

        setActiveTransition(null);

        setRunning(false);
        setExecutionLog([]);
            socket.emit('init-machine', {
            states,
            transitions,
            tape: savedTape
        });
    };

    const executeMachine = () => {

        if(running){
            return;
        }

        socket.emit(
            'run-machine',
            {
                states,
                transitions,
                tape: savedTape,
                speed
            }
        );
    };

    const executeStep = () => {

        socket.emit(
            'machine-step-manual'
        );
    };

    const pauseMachine = () => {

        socket.emit(
            'pause-machine'
        );

        setRunning(false);
    };

    const resetMachine = () => {

        socket.emit(
            'reset-machine'
        );

        initializeMachine();
    };

    useEffect(() => {

        socket.on(
            'machine-started',
            () => {

                setRunning(true);

                setResult(null);

                setStep(0);
            }
        );

        socket.on(
            'machine-step',
            (data) => {
                
                setMachineTape(data.tape);

                setHeadPosition(
                    data.headPosition
                );

                setCurrentState(
                    data.currentState
                );

                setActiveTransition(
                    data.activeTransition
                );

                setStep(data.step);
                setExecutionLog(prev => [
                    ...prev,
                    {
                        step: data.step,
                        state: data.currentState,
                        head: data.headPosition,
                        tape: data.tape,
                        transition: data.activeTransition
                    }
                ]);
            }
        );

        socket.on(
            'machine-accepted',
            () => {

                setResult('accepted');

                setRunning(false);
            }
        );

        socket.on(
            'machine-rejected',
            () => {

                setResult('rejected');

                setRunning(false);
            }
        );

        socket.on(
            'machine-halted',
            () => {

                setResult('halted');

                setRunning(false);
            }
        );

        socket.on(
            'machine-finished',
            () => {

                setRunning(false);
            }
        );

        socket.on(
            'machine-error',
            (error) => {

                console.log(error);

                setRunning(false);
            }
        );

        return () => {

            socket.off('machine-started');
            socket.off('machine-step');
            socket.off('machine-accepted');
            socket.off('machine-rejected');
            socket.off('machine-halted');
            socket.off('machine-finished');
            socket.off('machine-error');
        };

    }, []);

    const visibleTape =
        machineTape.slice(
            headPosition - 7,
            headPosition + 8
        );

    return(
        <div className='Main-simulator-container'>
            <div className='Header-simulator'>
                <div>
                    <span className='Title-simulator'>
                        Simulador
                    </span>
                    <p className='Description-simulator'>
                        Ejecuta y analiza el
                        comportamiento de la
                        Máquina de Turing.
                    </p>
                </div>
                <div className='Simulator-status-live'>
                    <div className='Simulator-live-dot'>
                    </div>
                    {
                        running
                        ? 'Ejecutando'
                        : 'Pausado'
                    }
                </div>
            </div>

            <div className='Simulator-top-grid'>
                <div className='Simulator-controls-container'>
                    <button
                        className='Simulator-control-button play'
                        onClick={executeMachine}
                    >
                        <Play size={17}/>
                        Ejecutar
                    </button>

                    <button
                        className='Simulator-control-button pause'
                        onClick={() => {

                            setRunning(false);

                            socket.emit(
                                'stop-machine'
                            );
                        }}
                    >
                        <Pause size={17}/>
                        Pausar
                    </button>

                    <button
                        className='Simulator-control-button step'
                        onClick={executeStep}
                    >
                        <StepForward size={17}/>
                        Paso
                    </button>

                    <button
                        className='Simulator-control-button reset'
                        onClick={resetMachine}
                    >
                        <RotateCcw size={17}/>
                        Reiniciar
                    </button>
                    <div className="Speed-control">
                        <label>Velocidad</label>

                        <input
                            type="range"
                            min="100"
                            max="2000"
                            step="100"
                            value={speed}
                            onChange={(e) => setSpeed(Number(e.target.value))}
                        />

                        <span>{speed} ms</span>
                    </div>
                </div>

                <div className='Simulator-stats'>
                    <div className='Simulator-stat-card'>
                        <span>
                            Estado
                        </span>
                        <strong>
                            {currentState}
                        </strong>
                    </div>

                    <div className='Simulator-stat-card'>
                        <span>
                            Cabezal
                        </span>
                        <strong>
                            {headPosition - 10}
                        </strong>
                    </div>

                    <div className='Simulator-stat-card'>
                        <span>
                            Pasos
                        </span>
                        <strong>
                            {step}
                        </strong>
                    </div>

                    <div className='Simulator-stat-card'>
                        <span>
                            Resultado
                        </span>
                        <strong>
                            {
                                result === 'accepted'
                                ? 'Aceptada'
                                : result === 'rejected'
                                ? 'Rechazada'
                                : result === 'halted'
                                ? 'Detenida'
                                : 'Activa'
                            }
                        </strong>
                    </div>
                </div>
            </div>

            <div className='Simulator-tape-container'>
                <div className='Simulator-section-header'>
                    <Cpu size={18}/>
                    <span>
                        Cinta de simulación
                    </span>
                </div>

                <div className='Simulator-tape-wrapper'>
                    {visibleTape.map((symbol, index) => {

                        const realIndex =
                            headPosition - 7 + index;

                        return(
                            <div
                                key={realIndex}
                                className={`Simulator-cell ${
                                    realIndex === headPosition
                                    ? 'active'
                                    : ''
                                }`}
                            >
                                <span>
                                    {
                                        symbol ===
                                        savedTape.blankSymbol
                                        ? <CircleSlash size={16}/>
                                        : symbol
                                    }
                                </span>

                                {
                                    realIndex === headPosition &&
                                    (
                                        <>
                                            <div className='Simulator-head'>
                                            </div>

                                            <span className='Simulator-head-text'>
                                                Cabezal
                                            </span>
                                        </>
                                    )
                                }
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className='Simulator-bottom-grid'>
                <div className='Simulator-transitions-panel'>
                    <SimulationGraph
                        nodes={
                            states.map((state, index) => ({
                                id: state.name,

                                type: 'default',

                                position: {
                                    x: (index % 3) * 250,
                                    y: Math.floor(index / 3) * 180
                                },

                                data: {
                                    label: state.name
                                },

                                style: {
                                    background:
                                        currentState === state.name
                                        ? '#7bd389'
                                        : '#1f2937',

                                    color: 'white',

                                    border:
                                        currentState === state.name
                                        ? '2px solid #7bd389'
                                        : '1px solid #374151',

                                    borderRadius: '14px',

                                    padding: '10px'
                                }
                            }))
                        }

                        edges={
                            transitions.map((transition) => ({
                                id: `edge-${transition.id}`,

                                source:
                                    transition.currentState,

                                target:
                                    transition.nextState,

                                animated:
                                    activeTransition ===
                                    transition.id,

                                label:
                                    `${transition.readSymbol} → ` +
                                    `${transition.writeSymbol}, ` +
                                    `${transition.direction}`,

                                style: {
                                    stroke:
                                        activeTransition ===
                                        transition.id
                                        ? '#7bd389'
                                        : '#64748b',

                                    strokeWidth:
                                        activeTransition ===
                                        transition.id
                                        ? 3
                                        : 1.5
                                }
                            }))
                        }
                    />
                    <div className='Simulator-table-panel'>
                        <div className='Simulator-section-header'>
                            <Cpu size={18}/>
                            <span>Tabla de transiciones</span>
                        </div>

                        <table className='Transition-table'>
                            <thead>
                                <tr>
                                    <th>Estado</th>
                                    <th>Lee</th>
                                    <th>Escribe</th>
                                    <th>Movimiento</th>
                                    <th>Siguiente</th>
                                </tr>
                            </thead>

                            <tbody>
                                {transitions.map((t) => (
                                    <tr key={t.id}>
                                        <td>{t.currentState}</td>
                                        <td>{t.readSymbol}</td>
                                        <td>{t.writeSymbol}</td>
                                        <td>{t.direction}</td>
                                        <td>{t.nextState}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className='Simulator-transitions-panel'>
                    <div className='Simulator-section-header'>
                        <ArrowRight size={18}/>

                        <span>
                            Transiciones
                        </span>
                    </div>

                    <div className='Simulator-transitions-grid'>
                        {transitions.map((transition) => (
                            <div
                                key={transition.id}
                                className={`Simulator-transition-card ${
                                    activeTransition === transition.id
                                    ? 'active'
                                    : ''
                                }`}
                            >
                                <div className='Simulator-transition-top'>
                                    <div className='Transition-state-mini'>
                                        {transition.currentState}
                                    </div>

                                    <ArrowRight size={16}/>

                                    <div className='Transition-state-mini'>
                                        {transition.nextState}
                                    </div>
                                </div>

                                <div className='Simulator-transition-bottom'>
                                    <span>
                                        Lee:
                                        <strong>
                                            {transition.readSymbol}
                                        </strong>
                                    </span>

                                    <span>
                                        Escribe:
                                        <strong>
                                            {transition.writeSymbol}
                                        </strong>
                                    </span>

                                    <span>
                                        Mueve:
                                        <strong>
                                            {transition.direction}
                                        </strong>
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='Simulator-chomsky-panel'>
                    <div className='Simulator-section-header'>
                        <BrainCircuit size={18}/>

                        <span>
                            Clasificación
                        </span>
                    </div>

                    <div className='Chomsky-main-card'>
                        <div className='Chomsky-badge'>
                            Tipo 0
                        </div>

                        <strong>
                            Máquina de Turing
                        </strong>

                        <p>
                            Pertenece a los lenguajes
                            recursivamente enumerables
                            dentro de la Jerarquía
                            de Chomsky.
                        </p>
                    </div>

                    <div className='Chomsky-levels'>
                        <div className='Chomsky-level'>
                            Tipo 1
                        </div>

                        <div className='Chomsky-level'>
                            Tipo 2
                        </div>

                        <div className='Chomsky-level'>
                            Tipo 3
                        </div>
                    </div>

                    <div className='Machine-summary'>
                        <Sparkles size={18}/>

                        <span>
                            La máquina utiliza
                            estados, transiciones,
                            cinta infinita y un
                            cabezal de lectura/escritura.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Simulation;