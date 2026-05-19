import '../assets/transitions.css';

import { useState, useEffect } from 'react';

import {
    Plus,
    GitBranch,
    Trash2,
    ArrowRight
} from 'lucide-react';

function Transitions(){
    const states = JSON.parse(localStorage.getItem('tm_states')) || [];
    const [transitions, setTransitions] = useState(() => {
        const savedTransitions = localStorage.getItem(
            'tm_transitions'
        );
        return savedTransitions
            ? JSON.parse(savedTransitions)
            : [];
    });
    const [form, setForm] = useState({
        currentState: '',
        readSymbol: '',
        nextState: '',
        writeSymbol: '',
        direction: 'R'
    });
    useEffect(() => {
        localStorage.setItem(
            'tm_transitions',
            JSON.stringify(transitions)
        );
    }, [transitions]);
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };
    const createTransition = () => {
        if(
            form.currentState.trim() === '' ||
            form.readSymbol.trim() === '' ||
            form.nextState.trim() === '' ||
            form.writeSymbol.trim() === ''
        ){
            return;
        }
        const duplicate = transitions.some(
            transition =>
                transition.currentState === form.currentState &&
                transition.readSymbol === form.readSymbol
        );
        if(duplicate){
            alert(
                'Ya existe una transición para ese estado y símbolo.'
            );
            return;
        }
        const newTransition = {
            id: Date.now(),
            ...form
        };
        setTransitions([
            ...transitions,
            newTransition
        ]);
        setForm({
            currentState: '',
            readSymbol: '',
            nextState: '',
            writeSymbol: '',
            direction: 'R'
        });
    };
    const deleteTransition = (id) => {
        setTransitions(
            transitions.filter(
                transition => transition.id !== id
            )
        );
    };
    return(
        <div className='Main-transitions-container'>
            <div className='Header-transitions'>
                <div>
                    <span className='Title-transitions'>
                        Transiciones
                    </span>
                    <p className='Description-transitions'>
                        Define las funciones de transición
                        de la Máquina de Turing.
                    </p>
                </div>
            </div>
            <div className='Create-transition-container'>
                <select
                    className='Select-direction'
                    name='currentState'
                    value={form.currentState}
                    onChange={handleChange}
                >
                    <option value=''>
                        Estado actual
                    </option>
                    {states.map((state) => (
                        <option
                            key={state.id}
                            value={state.name}
                        >
                            {state.name}
                        </option>
                    ))}
                </select>
                <input
                    className='Input-transition'
                    placeholder='Leer símbolo'
                    name='readSymbol'
                    maxLength={1}
                    value={form.readSymbol}
                    onChange={handleChange}
                />
                <select
                    className='Select-direction'
                    name='nextState'
                    value={form.nextState}
                    onChange={handleChange}
                >
                    <option value=''>
                        Siguiente estado
                    </option>
                    {states.map((state) => (
                        <option
                            key={state.id}
                            value={state.name}
                        >
                            {state.name}
                        </option>
                    ))}
                </select>
                <input
                    className='Input-transition'
                    placeholder='Escribir símbolo'
                    name='writeSymbol'
                    maxLength={1}
                    value={form.writeSymbol}
                    onChange={handleChange}
                />
                <select
                    className='Select-direction'
                    name='direction'
                    value={form.direction}
                    onChange={handleChange}
                >
                    <option value='L'>
                        Left
                    </option>
                    <option value='R'>
                        Right
                    </option>
                    <option value='S'>
                        Stay
                    </option>
                </select>
                <button
                    className='Button-create-transition'
                    onClick={createTransition}
                >
                    <Plus size={18}/>
                    Crear
                </button>
            </div>
            <div className='Transitions-grid'>
                {transitions.map((transition) => (
                    <div
                        key={transition.id}
                        className='Transition-card'
                    >
                        <div className='Transition-header'>
                            <div className='Transition-title-container'>
                                <GitBranch
                                    size={18}
                                    className='Transition-icon'
                                />
                                <span className='Transition-title'>
                                    Transición
                                </span>
                            </div>
                            <button
                                className='Delete-transition-button'
                                onClick={() =>
                                    deleteTransition(
                                        transition.id
                                    )
                                }
                            >
                                <Trash2 size={18}/>
                            </button>
                        </div>
                        <div className='Transition-body'>
                            <div className='Transition-state'>
                                {transition.currentState}
                            </div>
                            <div className='Transition-symbol'>
                                {transition.readSymbol}
                            </div>
                            <ArrowRight
                                size={18}
                                className='Arrow-transition'
                            />
                            <div className='Transition-state'>
                                {transition.nextState}
                            </div>
                        </div>
                        <div className='Transition-footer'>
                            <span className='Transition-write'>
                                Escribe:
                                <strong>
                                    {transition.writeSymbol}
                                </strong>
                            </span>
                            <span className='Transition-direction'>
                                Movimiento:
                                <strong>
                                    {transition.direction}
                                </strong>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Transitions;