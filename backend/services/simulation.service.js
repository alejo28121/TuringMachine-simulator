

function createMachine(machineData) {
    const { states, transitions, tape } = machineData;

    const blank = tape.blankSymbol || 'B';

    return {
        states,
        transitions,
        blank,

        tapeArray: (
            blank.repeat(10) +
            (tape.input || '') +
            blank.repeat(15)
        ).split(''),

        head: (tape.headPosition || 0) + 10,

        currentState: states.find(s => s.initial),
        step: 0
    };
}

function stepMachine(m) {
    const currentSymbol = m.tapeArray[m.head];

    const transition = m.transitions.find(t =>
        t.currentState === m.currentState.name &&
        t.readSymbol === currentSymbol
    );

    if (!transition) {
        return { status: 'halted', transition: null };
    }

    m.tapeArray[m.head] = transition.writeSymbol;

    if (transition.direction === 'R') m.head++;
    if (transition.direction === 'L') m.head--;

    const nextState = m.states.find(s => s.name === transition.nextState);

    if (!nextState) {
        return { status: 'error', message: 'Estado inválido' };
    }

    m.currentState = nextState;
    m.step++;

    if (m.currentState.accept) {
        return { status: 'accepted' };
    }

    if (m.currentState.reject) {
        return { status: 'rejected' };
    }

    return {
        status: 'running',
        transition
    };
}

module.exports = {
    createMachine,
    stepMachine
};