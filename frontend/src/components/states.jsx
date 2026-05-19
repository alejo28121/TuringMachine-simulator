import '../assets/states.css';
import { useState, useEffect } from 'react';
import {
    Plus,
    Circle,
    Trash2,
    CheckCircle2,
    XCircle
} from 'lucide-react';

function States(){
    const [states, setStates] = useState(() => {
        const savedStates = localStorage.getItem('tm_states');
        return savedStates
            ? JSON.parse(savedStates)
            : [
                {
                    id: 1,
                    name: 'q0',
                    initial: true,
                    accept: false,
                    reject: false
                }
            ];
    });
    const [stateName, setStateName] = useState('');
    const createState = () => {
        if(stateName.trim() === ''){
            return;
        }
        const newState = {
            id: Date.now(),
            name: stateName,
            initial: false,
            accept: false,
            reject: false
        };
        setStates([...states, newState]);
        setStateName('');
    };
    const deleteState = (id) => {
        setStates(states.filter(state => state.id !== id));
    };
    const setInitialState = (id) => {
        setStates(states.map(state => ({
            ...state,
            initial: state.id === id
        })));
    };
    const toggleAccept = (id) => {
        setStates(states.map(state =>
            state.id === id ? 
                {...state, accept: !state.accept}
            : state
        ));
    };
    const toggleReject = (id) => {
        setStates(states.map(state =>
            state.id === id
            ? {...state, reject: !state.reject}
            : state
        ));
    };
    useEffect(() => {
        localStorage.setItem(
            'tm_states',
            JSON.stringify(states)
        );
    }, [states]);
    return(
        <div className='Main-states-container'>
            <div className='Header-states'>
                <div>
                    <span className='Title-states'>
                        Estados
                    </span>
                    <p className='Description-states'>
                        Administra los estados de la Máquina de Turing.
                    </p>
                </div>
            </div>
            <div className='Create-state-container'>
                <input
                    className='Input-state'
                    placeholder='Nombre del estado (Ej: q0)'
                    value={stateName}
                    onChange={(e) => setStateName(e.target.value)}
                />
                <button
                    className='Button-create-state'
                    onClick={createState}
                >
                    <Plus size={18}/>
                    Crear estado
                </button>
            </div>
            <div className='States-grid'>
                {states.map((state) => (
                    <div
                        key={state.id}
                        className='State-card'
                    >
                        <div className='State-card-header'>
                            <div className='State-name-container'>
                                <Circle
                                    size={18}
                                    className='State-icon'
                                />
                                <span className='State-name'>
                                    {state.name}
                                </span>
                            </div>
                            <button
                                className='Delete-state-button'
                                onClick={() => deleteState(state.id)}
                            >
                                <Trash2 size={18}/>
                            </button>
                        </div>
                        <div className='State-badges'>
                            <button
                                className={`Badge-state ${
                                    state.initial ? 'active' : ''
                                }`}
                                onClick={() => setInitialState(state.id)}
                            >
                                Inicial
                            </button>
                            <button
                                className={`Badge-state ${
                                    state.accept ? 'accept' : ''
                                }`}
                                onClick={() => toggleAccept(state.id)}
                            >
                                <CheckCircle2 size={14}/>
                                Aceptación
                            </button>
                            <button
                                className={`Badge-state ${
                                    state.reject ? 'reject' : ''
                                }`}
                                onClick={() => toggleReject(state.id)}
                            >
                                <XCircle size={14}/>
                                Rechazo
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default States;