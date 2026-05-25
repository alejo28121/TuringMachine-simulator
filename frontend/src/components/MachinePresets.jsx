import { useState } from 'react';
import '../assets/machineModule.css';

const MACHINES = [

        /* =========================
        1. INCREMENTADOR BINARIO
        ========================= */
        {
            id: 'binary-increment',
            name: 'Incrementador Binario',
            description: 'Suma 1 a un número binario.',
            states: [
                { id: 'q0', name: 'q0', initial: true, accept: false, reject: false },
                { id: 'q1', name: 'q1', initial: false, accept: false, reject: false },
                { id: 'q2', name: 'q2', initial: false, accept: true, reject: false }
            ],
            transitions: [
                { id: 't1', currentState: 'q0', readSymbol: '0', writeSymbol: '0', direction: 'R', nextState: 'q0' },
                { id: 't2', currentState: 'q0', readSymbol: '1', writeSymbol: '1', direction: 'R', nextState: 'q0' },
                { id: 't3', currentState: 'q0', readSymbol: 'B', writeSymbol: 'B', direction: 'L', nextState: 'q1' },

                { id: 't4', currentState: 'q1', readSymbol: '1', writeSymbol: '0', direction: 'L', nextState: 'q1' },
                { id: 't5', currentState: 'q1', readSymbol: '0', writeSymbol: '1', direction: 'S', nextState: 'q2' },
                { id: 't6', currentState: 'q1', readSymbol: 'B', writeSymbol: '1', direction: 'S', nextState: 'q2' }
            ],
            tape: { input: '111', blankSymbol: 'B', headPosition: 0 }
        },

        /* =========================
        2. DECREMENTADOR BINARIO
        ========================= */
        {
            id: 'binary-decrement',
            name: 'Decrementador Binario',
            description: 'Resta 1 a un número binario.',
            states: [
                { id: 'q0', name: 'q0', initial: true, accept: false, reject: false },
                { id: 'q1', name: 'q1', initial: false, accept: false, reject: false },
                { id: 'q2', name: 'q2', initial: false, accept: true, reject: false }
            ],
            transitions: [
                { id: 't1', currentState: 'q0', readSymbol: '0', writeSymbol: '0', direction: 'R', nextState: 'q0' },
                { id: 't2', currentState: 'q0', readSymbol: '1', writeSymbol: '1', direction: 'R', nextState: 'q0' },
                { id: 't3', currentState: 'q0', readSymbol: 'B', writeSymbol: 'B', direction: 'L', nextState: 'q1' },

                { id: 't4', currentState: 'q1', readSymbol: '1', writeSymbol: '0', direction: 'S', nextState: 'q2' },
                { id: 't5', currentState: 'q1', readSymbol: '0', writeSymbol: '1', direction: 'L', nextState: 'q1' },
                { id: 't6', currentState: 'q1', readSymbol: 'B', writeSymbol: 'B', direction: 'S', nextState: 'q2' }
            ],
            tape: { input: '1010', blankSymbol: 'B', headPosition: 0 }
        },

        /* =========================
        3. LIMPIADOR DE CINTA
        ========================= */
        {
            id: 'tape-cleaner',
            name: 'Limpiador de Cinta',
            description: 'Borra toda la cinta y termina.',
            states: [
                { id: 'q0', name: 'q0', initial: true, accept: false, reject: false },
                { id: 'qf', name: 'qf', initial: false, accept: true, reject: false }
            ],
            transitions: [
                {
                    id: 't1',
                    currentState: 'q0',
                    readSymbol: '0',
                    writeSymbol: 'B',
                    direction: 'R',
                    nextState: 'q0'
                },
                {
                    id: 't2',
                    currentState: 'q0',
                    readSymbol: '1',
                    writeSymbol: 'B',
                    direction: 'R',
                    nextState: 'q0'
                },
                {
                    id: 't3',
                    currentState: 'q0',
                    readSymbol: 'B',
                    writeSymbol: 'B',
                    direction: 'S',
                    nextState: 'qf'
                }
            ],
            tape: {
                input: '101101',
                blankSymbol: 'B',
                headPosition: 0
            }
        },

        /* =========================
        4. COPIADOR SIMPLE (duplica string)
        ========================= */
        {
            id: 'string-copy',
            name: 'Copiador de Cadena',
            description: 'Copia una cadena a la derecha (simplificado).',
            states: [
                { id: 'q0', name: 'q0', initial: true, accept: false, reject: false },
                { id: 'q1', name: 'q1', initial: false, accept: true, reject: false }
            ],
            transitions: [
                { id: 't1', currentState: 'q0', readSymbol: 'a', writeSymbol: 'a', direction: 'R', nextState: 'q0' },
                { id: 't2', currentState: 'q0', readSymbol: 'b', writeSymbol: 'b', direction: 'R', nextState: 'q0' },
                { id: 't3', currentState: 'q0', readSymbol: 'B', writeSymbol: 'B', direction: 'S', nextState: 'q1' }
            ],
            tape: { input: 'ab', blankSymbol: 'B', headPosition: 0 }
        },

        /* =========================
        5. DETECTOR DE PALÍNDROMO (simple)
        ========================= */
        {
            id: 'palindrome-check',
            name: 'Detector de Palíndromo',
            description: 'Verifica si una cadena es palíndroma (simplificado).',
            states: [
                { id: 'q0', name: 'q0', initial: true, accept: false, reject: false },
                { id: 'q1', name: 'q1', initial: false, accept: false, reject: false },
                { id: 'q2', name: 'q2', initial: false, accept: true, reject: false }
            ],
            transitions: [
                { id: 't1', currentState: 'q0', readSymbol: 'a', writeSymbol: 'X', direction: 'R', nextState: 'q1' },
                { id: 't2', currentState: 'q1', readSymbol: 'a', writeSymbol: 'a', direction: 'R', nextState: 'q1' },
                { id: 't3', currentState: 'q1', readSymbol: 'B', writeSymbol: 'B', direction: 'L', nextState: 'q2' }
            ],
            tape: { input: 'abba', blankSymbol: 'B', headPosition: 0 }
        },

        /* =========================
        6. SHIFT IZQUIERDA (x2)
        ========================= */
        {
            id: 'shift-left',
            name: 'Multiplicador ×2',
            description: 'Multiplica por 2 desplazando bits.',
            states: [
                { id: 'q0', name: 'q0', initial: true, accept: false, reject: false },
                { id: 'q1', name: 'q1', initial: false, accept: true, reject: false }
            ],
            transitions: [
                { id: 't1', currentState: 'q0', readSymbol: '0', writeSymbol: '0', direction: 'R', nextState: 'q0' },
                { id: 't2', currentState: 'q0', readSymbol: '1', writeSymbol: '1', direction: 'R', nextState: 'q0' },
                { id: 't3', currentState: 'q0', readSymbol: 'B', writeSymbol: '0', direction: 'S', nextState: 'q1' }
            ],
            tape: { input: '101', blankSymbol: 'B', headPosition: 0 }
        },

        /* =========================
        7. RECONOCEDOR DE 1s (acepta solo 111...)
        ========================= */
        {
            id: 'only-ones',
            name: 'Solo 1s',
            description: 'Acepta solo cadenas compuestas por 1s.',

            states: [
                { id: 'q0', name: 'q0', initial: true, accept: false, reject: false },
                { id: 'q1', name: 'q1', initial: false, accept: false, reject: true },
                { id: 'q_accept', name: 'q_accept', initial: false, accept: true, reject: false }
            ],

            transitions: [
                {
                    id: 't1',
                    currentState: 'q0',
                    readSymbol: '1',
                    writeSymbol: '1',
                    direction: 'R',
                    nextState: 'q0'
                },
                {
                    id: 't2',
                    currentState: 'q0',
                    readSymbol: '0',
                    writeSymbol: '0',
                    direction: 'S',
                    nextState: 'q1'
                },
                {
                    id: 't3',
                    currentState: 'q0',
                    readSymbol: 'B',
                    writeSymbol: 'B',
                    direction: 'S',
                    nextState: 'q_accept'
                }
            ],

            tape: {
                input: '1111',
                blankSymbol: 'B',
                headPosition: 0
            }
        },

        /* =========================
        8. BUSCADOR DE BLANK
        ========================= */
        {
            id: 'find-blank',
            name: 'Buscar Blanco',
            description: 'Se mueve hasta encontrar B.',
            states: [
                { id: 'q0', name: 'q0', initial: true, accept: false, reject: false },
                { id: 'q_accept', name: 'q_accept', initial: false, accept: true, reject: false }
            ],
            transitions: [
                { id: 't1', currentState: 'q0', readSymbol: '0', writeSymbol: '0', direction: 'R', nextState: 'q0' },
                { id: 't2', currentState: 'q0', readSymbol: '1', writeSymbol: '1', direction: 'R', nextState: 'q0' },
                { id: 't3', currentState: 'q0', readSymbol: 'B', writeSymbol: 'B', direction: 'S', nextState: 'q_accept' }
            ],
            tape: { input: '10101', blankSymbol: 'B', headPosition: 0 }
        },

        /* =========================
        9. COPIA Y MARCA
        ========================= */
        {
            id: 'mark-copy',
            name: 'Copia con Marcado',
            description: 'Marca símbolos mientras copia.',
            states: [
                { id: 'q0', name: 'q0', initial: true, accept: false, reject: false },
                { id: 'q1', name: 'q1', initial: false, accept: true, reject: false }
            ],
            transitions: [
                { id: 't1', currentState: 'q0', readSymbol: 'a', writeSymbol: 'X', direction: 'R', nextState: 'q0' },
                { id: 't2', currentState: 'q0', readSymbol: 'b', writeSymbol: 'Y', direction: 'R', nextState: 'q0' },
                { id: 't3', currentState: 'q0', readSymbol: 'B', writeSymbol: 'B', direction: 'S', nextState: 'q1' }
            ],
            tape: { input: 'abab', blankSymbol: 'B', headPosition: 0 }
        }

];

export default function MachinePresetModule() {

    const [selectedId, setSelectedId] = useState(null);

    const selectMachine = (machine) => {

        const normalizedTransitions = machine.transitions.map(t => ({
            id: t.id || crypto.randomUUID(),
            ...t
        }));

        localStorage.setItem('tm_states', JSON.stringify(machine.states));
        localStorage.setItem('tm_transitions', JSON.stringify(normalizedTransitions));
        localStorage.setItem('tm_tape', JSON.stringify(machine.tape));

        setSelectedId(machine.id);

        window.dispatchEvent(new Event('tm-machine-changed'));
    };

    return (
        <div className="machine-module-container">

            <h2 className="module-title">
                Máquinas predefinidas
            </h2>

            <div className="machine-grid">

                {MACHINES.map((m) => (
                    <div
                        key={m.id}
                        className={`machine-card ${
                            selectedId === m.id ? 'active' : ''
                        }`}
                        onClick={() => selectMachine(m)}
                    >

                        <h3 className="machine-name">
                            {m.name}
                        </h3>

                        <p className="machine-description">
                            {m.description}
                        </p>

                        <div className="machine-footer">
                            {selectedId === m.id ? 'Seleccionada' : 'Seleccionar'}
                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
}