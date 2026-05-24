const delay = (ms) =>
    new Promise(resolve =>
        setTimeout(resolve, ms)
    );

async function executeMachine(machineData, socket, runningMachines){
    const {states, transitions, tape} = machineData;
    const blank = tape.blankSymbol || 'B';
    let currentState = states.find( state => state.initial);

    if(!currentState){
        throw new Error('No existe estado inicial');
    }

    let head = (tape.headPosition || 0) + 10;

    let tapeArray = (
        blank.repeat(10) +
        (tape.input || '') +
        blank.repeat(15)
    ).split('');

    let step = 0;

    const MAX_STEPS = 1000;

    while(runningMachines[socket.id]){
        if(step >= MAX_STEPS){
            socket.emit(
                'machine-error',
                {
                    message:
                        'Límite de pasos excedido'
                }
            );
            runningMachines[socket.id] = false;
            return {
                accepted: false,
                reason:
                    'Infinite loop'
            };
        }
        if(head < 0){
            tapeArray.unshift(blank);
            head = 0;
        }
        if(head >= tapeArray.length){
            tapeArray.push(blank);
        }
        const currentSymbol = tapeArray[head];
        const transition =transitions.find(
            transition =>
                transition.currentState ===
                currentState.name &&
                transition.readSymbol ===
                currentSymbol
        );
        socket.emit(
            'machine-step',
            {
                tape: [...tapeArray],
                headPosition: head,
                currentState:
                    currentState.name,
                readSymbol:
                    currentSymbol,
                step,
                activeTransition:
                    transition
                    ? transition.id
                    : null
            }
        );
        await delay(700);
        if(!transition){
            socket.emit(
                'machine-finished',
                {
                    result: 'halted'
                }
            );
            runningMachines[socket.id] = false;
            return {
                accepted: false,
                reason:
                    'No existe transición válida'
            };
        }
        tapeArray[head] =
            transition.writeSymbol;
        if(transition.direction === 'R'){
            head++;
        }
        if(transition.direction === 'L'){
            head--;
        }
        if(transition.direction === 'S'){
            head = head;
        }
        const nextState = states.find(
            state =>
                state.name ===
                transition.nextState
        );
        if(!nextState){
            socket.emit(
                'machine-error',
                {
                    message:
                        'Estado inválido'
                }
            );
            runningMachines[socket.id] = false;
            return {
                accepted: false,
                reason:
                    'Estado inválido'
            };
        }
        currentState = nextState;
        step++;
        socket.emit(
            'machine-step',
            {
                tape: [...tapeArray],
                headPosition: head,
                currentState:
                    currentState.name,
                readSymbol:
                    tapeArray[head],
                step,
                activeTransition:
                    transition.id
            }
        );
        if(currentState.accept){
            socket.emit(
                'machine-accepted',
                {
                    state:
                        currentState.name,
                    tape:
                        tapeArray.join('')
                }
            );
            socket.emit(
                'machine-finished',
                {
                    result: 'accepted'
                }
            );
            runningMachines[socket.id] = false;
            return {
                accepted: true,
                tape:
                    tapeArray.join('')
            };
        }
        if(currentState.reject){
            socket.emit(
                'machine-rejected',
                {
                    state:
                        currentState.name,
                    tape:
                        tapeArray.join('')
                }
            );
            socket.emit(
                'machine-finished',
                {
                    result: 'rejected'
                }
            );
            runningMachines[socket.id] = false;
            return {
                accepted: false,
                tape:
                    tapeArray.join('')
            };
        }
    }
}

module.exports = {
    executeMachine
};