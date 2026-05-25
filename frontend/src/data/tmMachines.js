export const TM_MACHINES = [
    {
        id: 'binary-increment',
        name: 'Incrementador Binario',
        initialTape: '111',
        blankSymbol: 'B',
        headPosition: 0,
        states: [
            { name: 'q0', initial: true, accept: false, reject: false },
            { name: 'q1', initial: false, accept: true, reject: false }
        ],
        transitions: [
            {
                id: 1,
                currentState: 'q0',
                readSymbol: '1',
                writeSymbol: '0',
                direction: 'L',
                nextState: 'q0'
            },
            {
                id: 2,
                currentState: 'q0',
                readSymbol: 'B',
                writeSymbol: '1',
                direction: 'S',
                nextState: 'q1'
            }
        ]
    },
    {
        id: 'string-reverse',
        name: 'Reverso de cadena',
        initialTape: 'abc',
        blankSymbol: 'B',
        headPosition: 0,
        states: [
            { name: 'q0', initial: true, accept: false, reject: false },
            { name: 'qf', initial: false, accept: true, reject: false }
        ],
        transitions: [
            {
                id: 1,
                currentState: 'q0',
                readSymbol: 'a',
                writeSymbol: 'a',
                direction: 'R',
                nextState: 'q0'
            },
            {
                id: 2,
                currentState: 'q0',
                readSymbol: 'B',
                writeSymbol: 'B',
                direction: 'S',
                nextState: 'qf'
            }
        ]
    }
];