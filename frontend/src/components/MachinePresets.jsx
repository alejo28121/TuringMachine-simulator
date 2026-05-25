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
        },
        {
            id: 'palindrome-ab',
            name: 'Palíndromos a/b',
            description: 'Acepta cadenas palíndromas sobre {a,b}.',

            states: [
                { id: 'q0', name: 'q0', initial: true, accept: false, reject: false },
                { id: 'qa', name: 'qa', initial: false, accept: false, reject: false },
                { id: 'qb', name: 'qb', initial: false, accept: false, reject: false },
                { id: 'qva', name: 'qva', initial: false, accept: false, reject: false },
                { id: 'qvb', name: 'qvb', initial: false, accept: false, reject: false },
                { id: 'qret', name: 'qret', initial: false, accept: false, reject: false },

                { id: 'q_accept', name: 'q_accept', initial: false, accept: true, reject: false },
                { id: 'q_reject', name: 'q_reject', initial: false, accept: false, reject: true }
            ],

            transitions: [

                // =========================
                // q0
                // =========================

                {
                    id: 't1',
                    currentState: 'q0',
                    readSymbol: 'X',
                    writeSymbol: 'X',
                    direction: 'R',
                    nextState: 'q0'
                },

                {
                    id: 't2',
                    currentState: 'q0',
                    readSymbol: 'a',
                    writeSymbol: 'X',
                    direction: 'R',
                    nextState: 'qa'
                },

                {
                    id: 't3',
                    currentState: 'q0',
                    readSymbol: 'b',
                    writeSymbol: 'X',
                    direction: 'R',
                    nextState: 'qb'
                },

                {
                    id: 't4',
                    currentState: 'q0',
                    readSymbol: 'B',
                    writeSymbol: 'B',
                    direction: 'S',
                    nextState: 'q_accept'
                },

                // =========================
                // qa
                // =========================

                {
                    id: 't5',
                    currentState: 'qa',
                    readSymbol: 'a',
                    writeSymbol: 'a',
                    direction: 'R',
                    nextState: 'qa'
                },

                {
                    id: 't6',
                    currentState: 'qa',
                    readSymbol: 'b',
                    writeSymbol: 'b',
                    direction: 'R',
                    nextState: 'qa'
                },

                {
                    id: 't7',
                    currentState: 'qa',
                    readSymbol: 'X',
                    writeSymbol: 'X',
                    direction: 'R',
                    nextState: 'qa'
                },

                {
                    id: 't8',
                    currentState: 'qa',
                    readSymbol: 'B',
                    writeSymbol: 'B',
                    direction: 'L',
                    nextState: 'qva'
                },

                // =========================
                // qva
                // =========================

                {
                    id: 't9',
                    currentState: 'qva',
                    readSymbol: 'X',
                    writeSymbol: 'X',
                    direction: 'L',
                    nextState: 'qva'
                },

                {
                    id: 't10',
                    currentState: 'qva',
                    readSymbol: 'a',
                    writeSymbol: 'X',
                    direction: 'L',
                    nextState: 'qret'
                },

                {
                    id: 't11',
                    currentState: 'qva',
                    readSymbol: 'b',
                    writeSymbol: 'b',
                    direction: 'S',
                    nextState: 'q_reject'
                },

                {
                    id: 't12',
                    currentState: 'qva',
                    readSymbol: 'B',
                    writeSymbol: 'B',
                    direction: 'S',
                    nextState: 'q_accept'
                },

                // =========================
                // qb
                // =========================

                {
                    id: 't13',
                    currentState: 'qb',
                    readSymbol: 'a',
                    writeSymbol: 'a',
                    direction: 'R',
                    nextState: 'qb'
                },

                {
                    id: 't14',
                    currentState: 'qb',
                    readSymbol: 'b',
                    writeSymbol: 'b',
                    direction: 'R',
                    nextState: 'qb'
                },

                {
                    id: 't15',
                    currentState: 'qb',
                    readSymbol: 'X',
                    writeSymbol: 'X',
                    direction: 'R',
                    nextState: 'qb'
                },

                {
                    id: 't16',
                    currentState: 'qb',
                    readSymbol: 'B',
                    writeSymbol: 'B',
                    direction: 'L',
                    nextState: 'qvb'
                },

                // =========================
                // qvb
                // =========================

                {
                    id: 't17',
                    currentState: 'qvb',
                    readSymbol: 'X',
                    writeSymbol: 'X',
                    direction: 'L',
                    nextState: 'qvb'
                },

                {
                    id: 't18',
                    currentState: 'qvb',
                    readSymbol: 'b',
                    writeSymbol: 'X',
                    direction: 'L',
                    nextState: 'qret'
                },

                {
                    id: 't19',
                    currentState: 'qvb',
                    readSymbol: 'a',
                    writeSymbol: 'a',
                    direction: 'S',
                    nextState: 'q_reject'
                },

                {
                    id: 't20',
                    currentState: 'qvb',
                    readSymbol: 'B',
                    writeSymbol: 'B',
                    direction: 'S',
                    nextState: 'q_accept'
                },

                // =========================
                // qret
                // =========================

                {
                    id: 't21',
                    currentState: 'qret',
                    readSymbol: 'a',
                    writeSymbol: 'a',
                    direction: 'L',
                    nextState: 'qret'
                },

                {
                    id: 't22',
                    currentState: 'qret',
                    readSymbol: 'b',
                    writeSymbol: 'b',
                    direction: 'L',
                    nextState: 'qret'
                },

                {
                    id: 't23',
                    currentState: 'qret',
                    readSymbol: 'X',
                    writeSymbol: 'X',
                    direction: 'L',
                    nextState: 'qret'
                },

                {
                    id: 't24',
                    currentState: 'qret',
                    readSymbol: 'B',
                    writeSymbol: 'B',
                    direction: 'R',
                    nextState: 'q0'
                }
            ],

            tape: {
                input: 'abba',
                blankSymbol: 'B',
                headPosition: 0
            }
        },
        {
            id: 'anbncn',
            name: 'a^n b^n c^n',
            description: 'Acepta cadenas del tipo a^n b^n c^n.',

            states: [
                { id: 'q0', name: 'q0', initial: true, accept: false, reject: false },

                { id: 'q1', name: 'q1', initial: false, accept: false, reject: false },
                { id: 'q2', name: 'q2', initial: false, accept: false, reject: false },
                { id: 'q3', name: 'q3', initial: false, accept: false, reject: false },

                { id: 'q_accept', name: 'q_accept', initial: false, accept: true, reject: false },
                { id: 'q_reject', name: 'q_reject', initial: false, accept: false, reject: true }
            ],

            transitions: [

                // =========================
                // q0 -> buscar a
                // =========================

                {
                    id: 't1',
                    currentState: 'q0',
                    readSymbol: 'X',
                    writeSymbol: 'X',
                    direction: 'R',
                    nextState: 'q0'
                },

                {
                    id: 't2',
                    currentState: 'q0',
                    readSymbol: 'a',
                    writeSymbol: 'X',
                    direction: 'R',
                    nextState: 'q1'
                },

                {
                    id: 't3',
                    currentState: 'q0',
                    readSymbol: 'Y',
                    writeSymbol: 'Y',
                    direction: 'R',
                    nextState: 'q0'
                },

                {
                    id: 't4',
                    currentState: 'q0',
                    readSymbol: 'Z',
                    writeSymbol: 'Z',
                    direction: 'R',
                    nextState: 'q0'
                },

                {
                    id: 't5',
                    currentState: 'q0',
                    readSymbol: 'B',
                    writeSymbol: 'B',
                    direction: 'S',
                    nextState: 'q_accept'
                },

                // =========================
                // q1 -> buscar b
                // =========================

                {
                    id: 't6',
                    currentState: 'q1',
                    readSymbol: 'a',
                    writeSymbol: 'a',
                    direction: 'R',
                    nextState: 'q1'
                },

                {
                    id: 't7',
                    currentState: 'q1',
                    readSymbol: 'Y',
                    writeSymbol: 'Y',
                    direction: 'R',
                    nextState: 'q1'
                },

                {
                    id: 't8',
                    currentState: 'q1',
                    readSymbol: 'b',
                    writeSymbol: 'Y',
                    direction: 'R',
                    nextState: 'q2'
                },

                {
                    id: 't9',
                    currentState: 'q1',
                    readSymbol: 'c',
                    writeSymbol: 'c',
                    direction: 'S',
                    nextState: 'q_reject'
                },

                {
                    id: 't10',
                    currentState: 'q1',
                    readSymbol: 'Z',
                    writeSymbol: 'Z',
                    direction: 'S',
                    nextState: 'q_reject'
                },

                // =========================
                // q2 -> buscar c
                // =========================

                {
                    id: 't11',
                    currentState: 'q2',
                    readSymbol: 'b',
                    writeSymbol: 'b',
                    direction: 'R',
                    nextState: 'q2'
                },

                {
                    id: 't12',
                    currentState: 'q2',
                    readSymbol: 'Z',
                    writeSymbol: 'Z',
                    direction: 'R',
                    nextState: 'q2'
                },

                {
                    id: 't13',
                    currentState: 'q2',
                    readSymbol: 'c',
                    writeSymbol: 'Z',
                    direction: 'L',
                    nextState: 'q3'
                },

                {
                    id: 't14',
                    currentState: 'q2',
                    readSymbol: 'B',
                    writeSymbol: 'B',
                    direction: 'S',
                    nextState: 'q_reject'
                },

                // =========================
                // q3 -> regresar al inicio
                // =========================

                {
                    id: 't15',
                    currentState: 'q3',
                    readSymbol: 'a',
                    writeSymbol: 'a',
                    direction: 'L',
                    nextState: 'q3'
                },

                {
                    id: 't16',
                    currentState: 'q3',
                    readSymbol: 'b',
                    writeSymbol: 'b',
                    direction: 'L',
                    nextState: 'q3'
                },

                {
                    id: 't17',
                    currentState: 'q3',
                    readSymbol: 'c',
                    writeSymbol: 'c',
                    direction: 'L',
                    nextState: 'q3'
                },

                {
                    id: 't18',
                    currentState: 'q3',
                    readSymbol: 'X',
                    writeSymbol: 'X',
                    direction: 'L',
                    nextState: 'q3'
                },

                {
                    id: 't19',
                    currentState: 'q3',
                    readSymbol: 'Y',
                    writeSymbol: 'Y',
                    direction: 'L',
                    nextState: 'q3'
                },

                {
                    id: 't20',
                    currentState: 'q3',
                    readSymbol: 'Z',
                    writeSymbol: 'Z',
                    direction: 'L',
                    nextState: 'q3'
                },

                {
                    id: 't21',
                    currentState: 'q3',
                    readSymbol: 'B',
                    writeSymbol: 'B',
                    direction: 'R',
                    nextState: 'q0'
                }
            ],

            tape: {
                input: 'aaabbbccc',
                blankSymbol: 'B',
                headPosition: 0
            }
        },
        {
        id: 'binary-addition-correct',
        name: 'Suma Binaria Correcta',
        description: 'Suma dos números binarios separados por +.',

        states: [
            { id: 'q0', name: 'q0', initial: true, accept: false, reject: false },

            { id: 'qRight', name: 'qRight', initial: false, accept: false, reject: false },

            { id: 'qAdd0', name: 'qAdd0', initial: false, accept: false, reject: false },
            { id: 'qAdd1', name: 'qAdd1', initial: false, accept: false, reject: false },

            { id: 'qCarry', name: 'qCarry', initial: false, accept: false, reject: false },

            { id: 'qBack', name: 'qBack', initial: false, accept: false, reject: false },

            { id: 'q_accept', name: 'q_accept', initial: false, accept: true, reject: false },
            { id: 'q_reject', name: 'q_reject', initial: false, accept: false, reject: true }
        ],

        transitions: [

            // =========================
            // q0 -> ir al final
            // =========================

            {
                id: 't1',
                currentState: 'q0',
                readSymbol: '0',
                writeSymbol: '0',
                direction: 'R',
                nextState: 'q0'
            },

            {
                id: 't2',
                currentState: 'q0',
                readSymbol: '1',
                writeSymbol: '1',
                direction: 'R',
                nextState: 'q0'
            },

            {
                id: 't3',
                currentState: 'q0',
                readSymbol: '+',
                writeSymbol: '+',
                direction: 'R',
                nextState: 'q0'
            },

            {
                id: 't4',
                currentState: 'q0',
                readSymbol: 'B',
                writeSymbol: 'B',
                direction: 'L',
                nextState: 'qRight'
            },

            // =========================
            // qRight -> procesar último bit
            // =========================

            {
                id: 't5',
                currentState: 'qRight',
                readSymbol: '0',
                writeSymbol: 'B',
                direction: 'L',
                nextState: 'qAdd0'
            },

            {
                id: 't6',
                currentState: 'qRight',
                readSymbol: '1',
                writeSymbol: 'B',
                direction: 'L',
                nextState: 'qAdd1'
            },

            {
                id: 't7',
                currentState: 'qRight',
                readSymbol: '+',
                writeSymbol: '+',
                direction: 'S',
                nextState: 'q_accept'
            },

            // =========================
            // qAdd0
            // =========================

            {
                id: 't8',
                currentState: 'qAdd0',
                readSymbol: '0',
                writeSymbol: '0',
                direction: 'L',
                nextState: 'qAdd0'
            },

            {
                id: 't9',
                currentState: 'qAdd0',
                readSymbol: '1',
                writeSymbol: '1',
                direction: 'L',
                nextState: 'qAdd0'
            },

            {
                id: 't10',
                currentState: 'qAdd0',
                readSymbol: '+',
                writeSymbol: '+',
                direction: 'L',
                nextState: 'qBack'
            },

            // =========================
            // qAdd1
            // =========================

            {
                id: 't11',
                currentState: 'qAdd1',
                readSymbol: '0',
                writeSymbol: '1',
                direction: 'R',
                nextState: 'q0'
            },

            {
                id: 't12',
                currentState: 'qAdd1',
                readSymbol: '1',
                writeSymbol: '0',
                direction: 'L',
                nextState: 'qCarry'
            },

            {
                id: 't13',
                currentState: 'qAdd1',
                readSymbol: '+',
                writeSymbol: '+',
                direction: 'L',
                nextState: 'qCarry'
            },

            // =========================
            // qCarry
            // =========================

            {
                id: 't14',
                currentState: 'qCarry',
                readSymbol: '0',
                writeSymbol: '1',
                direction: 'R',
                nextState: 'q0'
            },

            {
                id: 't15',
                currentState: 'qCarry',
                readSymbol: '1',
                writeSymbol: '0',
                direction: 'L',
                nextState: 'qCarry'
            },

            {
                id: 't16',
                currentState: 'qCarry',
                readSymbol: 'B',
                writeSymbol: '1',
                direction: 'R',
                nextState: 'q_accept'
            },

            // =========================
            // qBack
            // =========================

            {
                id: 't17',
                currentState: 'qBack',
                readSymbol: '0',
                writeSymbol: '0',
                direction: 'L',
                nextState: 'qBack'
            },

            {
                id: 't18',
                currentState: 'qBack',
                readSymbol: '1',
                writeSymbol: '1',
                direction: 'L',
                nextState: 'qBack'
            },

            {
                id: 't19',
                currentState: 'qBack',
                readSymbol: 'B',
                writeSymbol: 'B',
                direction: 'R',
                nextState: 'q0'
            }
        ],

        tape: {
            input: '1+10',
            blankSymbol: 'B',
            headPosition: 0
        }
    },
    {
        id: 'sort-a-c',
        name: 'Ordenamiento A/C',
        description: 'Ordena símbolos dejando todas las A antes que las C.',

        states: [
            { id: 'q0', name: 'q0', initial: true, accept: false, reject: false },

            { id: 'qFindA', name: 'qFindA', initial: false, accept: false, reject: false },

            { id: 'qSwap', name: 'qSwap', initial: false, accept: false, reject: false },

            { id: 'qReturn', name: 'qReturn', initial: false, accept: false, reject: false },

            { id: 'q_accept', name: 'q_accept', initial: false, accept: true, reject: false }
        ],

        transitions: [

            // =========================
            // q0 -> buscar primera C
            // =========================

            {
                id: 't1',
                currentState: 'q0',
                readSymbol: 'A',
                writeSymbol: 'A',
                direction: 'R',
                nextState: 'q0'
            },

            {
                id: 't2',
                currentState: 'q0',
                readSymbol: 'C',
                writeSymbol: 'C',
                direction: 'R',
                nextState: 'qFindA'
            },

            {
                id: 't3',
                currentState: 'q0',
                readSymbol: 'B',
                writeSymbol: 'B',
                direction: 'S',
                nextState: 'q_accept'
            },

            // =========================
            // qFindA -> buscar una A
            // =========================

            {
                id: 't4',
                currentState: 'qFindA',
                readSymbol: 'C',
                writeSymbol: 'C',
                direction: 'R',
                nextState: 'qFindA'
            },

            {
                id: 't5',
                currentState: 'qFindA',
                readSymbol: 'A',
                writeSymbol: 'C',
                direction: 'L',
                nextState: 'qSwap'
            },

            {
                id: 't6',
                currentState: 'qFindA',
                readSymbol: 'B',
                writeSymbol: 'B',
                direction: 'S',
                nextState: 'q_accept'
            },

            // =========================
            // qSwap -> reemplazar la C encontrada por A
            // =========================

            {
                id: 't7',
                currentState: 'qSwap',
                readSymbol: 'C',
                writeSymbol: 'A',
                direction: 'L',
                nextState: 'qReturn'
            },

            // =========================
            // qReturn -> volver al inicio
            // =========================

            {
                id: 't8',
                currentState: 'qReturn',
                readSymbol: 'A',
                writeSymbol: 'A',
                direction: 'L',
                nextState: 'qReturn'
            },

            {
                id: 't9',
                currentState: 'qReturn',
                readSymbol: 'C',
                writeSymbol: 'C',
                direction: 'L',
                nextState: 'qReturn'
            },

            {
                id: 't10',
                currentState: 'qReturn',
                readSymbol: 'B',
                writeSymbol: 'B',
                direction: 'R',
                nextState: 'q0'
            }
        ],

        tape: {
            input: 'CCCAAACACA',
            blankSymbol: 'B',
            headPosition: 0
        }
    },
    {
        id: 'balanced-parentheses',
        name: 'Paréntesis Balanceados',
        description: 'Verifica si los paréntesis están balanceados.',

        states: [
            { id: 'q0', name: 'q0', initial: true, accept: false, reject: false },

            { id: 'qFindClose', name: 'qFindClose', initial: false, accept: false, reject: false },

            { id: 'qReturn', name: 'qReturn', initial: false, accept: false, reject: false },

            { id: 'q_accept', name: 'q_accept', initial: false, accept: true, reject: false },

            { id: 'q_reject', name: 'q_reject', initial: false, accept: false, reject: true }
        ],

        transitions: [

            {
                id: 't1',
                currentState: 'q0',
                readSymbol: 'X',
                writeSymbol: 'X',
                direction: 'R',
                nextState: 'q0'
            },

            {
                id: 't2',
                currentState: 'q0',
                readSymbol: '(',
                writeSymbol: 'X',
                direction: 'R',
                nextState: 'qFindClose'
            },

            {
                id: 't3',
                currentState: 'q0',
                readSymbol: ')',
                writeSymbol: ')',
                direction: 'S',
                nextState: 'q_reject'
            },

            {
                id: 't4',
                currentState: 'q0',
                readSymbol: 'B',
                writeSymbol: 'B',
                direction: 'S',
                nextState: 'q_accept'
            },

            // Buscar cierre

            {
                id: 't5',
                currentState: 'qFindClose',
                readSymbol: '(',
                writeSymbol: '(',
                direction: 'R',
                nextState: 'qFindClose'
            },

            {
                id: 't6',
                currentState: 'qFindClose',
                readSymbol: 'X',
                writeSymbol: 'X',
                direction: 'R',
                nextState: 'qFindClose'
            },

            {
                id: 't7',
                currentState: 'qFindClose',
                readSymbol: ')',
                writeSymbol: 'X',
                direction: 'L',
                nextState: 'qReturn'
            },

            {
                id: 't8',
                currentState: 'qFindClose',
                readSymbol: 'B',
                writeSymbol: 'B',
                direction: 'S',
                nextState: 'q_reject'
            },

            // Volver

            {
                id: 't9',
                currentState: 'qReturn',
                readSymbol: '(',
                writeSymbol: '(',
                direction: 'L',
                nextState: 'qReturn'
            },

            {
                id: 't10',
                currentState: 'qReturn',
                readSymbol: ')',
                writeSymbol: ')',
                direction: 'L',
                nextState: 'qReturn'
            },

            {
                id: 't11',
                currentState: 'qReturn',
                readSymbol: 'X',
                writeSymbol: 'X',
                direction: 'L',
                nextState: 'qReturn'
            },

            {
                id: 't12',
                currentState: 'qReturn',
                readSymbol: 'B',
                writeSymbol: 'B',
                direction: 'R',
                nextState: 'q0'
            }
        ],

        tape: {
            input: '(()(()))',
            blankSymbol: 'B',
            headPosition: 0
        }
    },
    {
        id: 'rule30',
        name: 'Rule 30',
        description: 'Simulación simplificada de autómata celular Rule 30.',

        states: [
            { id: 'q0', name: 'q0', initial: true, accept: false, reject: false },

            { id: 'qFlip', name: 'qFlip', initial: false, accept: false, reject: false },

            { id: 'q_accept', name: 'q_accept', initial: false, accept: true, reject: false }
        ],

        transitions: [

            {
                id: 't1',
                currentState: 'q0',
                readSymbol: '0',
                writeSymbol: '1',
                direction: 'R',
                nextState: 'q0'
            },

            {
                id: 't2',
                currentState: 'q0',
                readSymbol: '1',
                writeSymbol: '0',
                direction: 'R',
                nextState: 'q0'
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
            input: '101010101',
            blankSymbol: 'B',
            headPosition: 0
        }
    },
    {
        id: 'caesar-cipher',
        name: 'Cifrado César',
        description: 'Cifrado César con desplazamiento +3 usando - como blanco.',

        states: [
            { id: 'q0', name: 'q0', initial: true, accept: false, reject: false },

            { id: 'q_accept', name: 'q_accept', initial: false, accept: true, reject: false }
        ],

        transitions: [

            {
                id: 't1',
                currentState: 'q0',
                readSymbol: 'A',
                writeSymbol: 'D',
                direction: 'R',
                nextState: 'q0'
            },

            {
                id: 't2',
                currentState: 'q0',
                readSymbol: 'B',
                writeSymbol: 'E',
                direction: 'R',
                nextState: 'q0'
            },

            {
                id: 't3',
                currentState: 'q0',
                readSymbol: 'C',
                writeSymbol: 'F',
                direction: 'R',
                nextState: 'q0'
            },

            {
                id: 't4',
                currentState: 'q0',
                readSymbol: 'D',
                writeSymbol: 'G',
                direction: 'R',
                nextState: 'q0'
            },

            {
                id: 't5',
                currentState: 'q0',
                readSymbol: 'E',
                writeSymbol: 'H',
                direction: 'R',
                nextState: 'q0'
            },

            {
                id: 't6',
                currentState: 'q0',
                readSymbol: 'F',
                writeSymbol: 'I',
                direction: 'R',
                nextState: 'q0'
            },

            {
                id: 't7',
                currentState: 'q0',
                readSymbol: 'G',
                writeSymbol: 'J',
                direction: 'R',
                nextState: 'q0'
            },

            {
                id: 't8',
                currentState: 'q0',
                readSymbol: 'H',
                writeSymbol: 'K',
                direction: 'R',
                nextState: 'q0'
            },

            {
                id: 't9',
                currentState: 'q0',
                readSymbol: 'I',
                writeSymbol: 'L',
                direction: 'R',
                nextState: 'q0'
            },

            {
                id: 't10',
                currentState: 'q0',
                readSymbol: 'J',
                writeSymbol: 'M',
                direction: 'R',
                nextState: 'q0'
            },

            {
                id: 't11',
                currentState: 'q0',
                readSymbol: 'K',
                writeSymbol: 'N',
                direction: 'R',
                nextState: 'q0'
            },

            {
                id: 't12',
                currentState: 'q0',
                readSymbol: 'L',
                writeSymbol: 'O',
                direction: 'R',
                nextState: 'q0'
            },

            {
                id: 't13',
                currentState: 'q0',
                readSymbol: 'M',
                writeSymbol: 'P',
                direction: 'R',
                nextState: 'q0'
            },

            {
                id: 't14',
                currentState: 'q0',
                readSymbol: 'N',
                writeSymbol: 'Q',
                direction: 'R',
                nextState: 'q0'
            },

            {
                id: 't15',
                currentState: 'q0',
                readSymbol: 'O',
                writeSymbol: 'R',
                direction: 'R',
                nextState: 'q0'
            },

            {
                id: 't16',
                currentState: 'q0',
                readSymbol: 'P',
                writeSymbol: 'S',
                direction: 'R',
                nextState: 'q0'
            },

            {
                id: 't17',
                currentState: 'q0',
                readSymbol: 'Q',
                writeSymbol: 'T',
                direction: 'R',
                nextState: 'q0'
            },

            {
                id: 't18',
                currentState: 'q0',
                readSymbol: 'R',
                writeSymbol: 'U',
                direction: 'R',
                nextState: 'q0'
            },

            {
                id: 't19',
                currentState: 'q0',
                readSymbol: 'S',
                writeSymbol: 'V',
                direction: 'R',
                nextState: 'q0'
            },

            {
                id: 't20',
                currentState: 'q0',
                readSymbol: 'T',
                writeSymbol: 'W',
                direction: 'R',
                nextState: 'q0'
            },

            {
                id: 't21',
                currentState: 'q0',
                readSymbol: 'U',
                writeSymbol: 'X',
                direction: 'R',
                nextState: 'q0'
            },

            {
                id: 't22',
                currentState: 'q0',
                readSymbol: 'V',
                writeSymbol: 'Y',
                direction: 'R',
                nextState: 'q0'
            },

            {
                id: 't23',
                currentState: 'q0',
                readSymbol: 'W',
                writeSymbol: 'Z',
                direction: 'R',
                nextState: 'q0'
            },

            {
                id: 't24',
                currentState: 'q0',
                readSymbol: 'X',
                writeSymbol: 'A',
                direction: 'R',
                nextState: 'q0'
            },

            {
                id: 't25',
                currentState: 'q0',
                readSymbol: 'Y',
                writeSymbol: 'B',
                direction: 'R',
                nextState: 'q0'
            },

            {
                id: 't26',
                currentState: 'q0',
                readSymbol: 'Z',
                writeSymbol: 'C',
                direction: 'R',
                nextState: 'q0'
            },

            {
                id: 't27',
                currentState: 'q0',
                readSymbol: '-',
                writeSymbol: '-',
                direction: 'S',
                nextState: 'q_accept'
            }
        ],

        tape: {
            input: 'HOLA',
            blankSymbol: '-',
            headPosition: 0
        }
    },
    {
        id: 'run-length',
        name: 'Run Length',
        description: 'Comprime secuencias repetidas.',

        states: [
            { id: 'q0', name: 'q0', initial: true, accept: false, reject: false },

            { id: 'qA', name: 'qA', initial: false, accept: false, reject: false },

            { id: 'qWrite', name: 'qWrite', initial: false, accept: false, reject: false },

            { id: 'q_accept', name: 'q_accept', initial: false, accept: true, reject: false }
        ],

        transitions: [

            // Buscar A

            {
                id: 't1',
                currentState: 'q0',
                readSymbol: 'A',
                writeSymbol: 'X',
                direction: 'R',
                nextState: 'qA'
            },

            {
                id: 't2',
                currentState: 'q0',
                readSymbol: 'B',
                writeSymbol: 'B',
                direction: 'S',
                nextState: 'q_accept'
            },

            // Contar As

            {
                id: 't3',
                currentState: 'qA',
                readSymbol: 'A',
                writeSymbol: 'X',
                direction: 'R',
                nextState: 'qA'
            },

            {
                id: 't4',
                currentState: 'qA',
                readSymbol: 'B',
                writeSymbol: 'B',
                direction: 'L',
                nextState: 'qWrite'
            },

            // Escribir resultado simple

            {
                id: 't5',
                currentState: 'qWrite',
                readSymbol: 'X',
                writeSymbol: '5',
                direction: 'R',
                nextState: 'q_accept'
            }
        ],

        tape: {
            input: 'AAAAA',
            blankSymbol: 'B',
            headPosition: 0
        }
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