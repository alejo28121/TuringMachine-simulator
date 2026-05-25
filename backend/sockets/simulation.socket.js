// simulationSocket.js

const {
    createMachine,
    stepMachine
} = require('../services/simulation.service');

const machines = {};

function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
}

function simulationSocket(io) {
    io.on('connection', (socket) => {

        console.log('Cliente conectado:', socket.id);

        socket.on('init-machine', (data) => {
            machines[socket.id] = createMachine(data);
            machines[socket.id].running = false; 
        });
        socket.on('run-machine', async (data) => {

            const m = createMachine(data);
            m.running = true;
            m.speed = data.speed || 1000;

            machines[socket.id] = m;

            socket.emit('machine-started');

            
            while (machines[socket.id]?.running) {

                const result = stepMachine(m);

                socket.emit('machine-step', {
                    tape: [...m.tapeArray],
                    headPosition: m.head,
                    currentState: m.currentState.name,
                    step: m.step,
                    activeTransition: result.transition?.id || null
                });

                if (result.status !== 'running') {
                    socket.emit(`machine-${result.status}`, result);
                    socket.emit('machine-finished', result);
                    break;
                }

                await sleep(m.speed);
            }
        });

        
        socket.on('machine-step-manual', () => {
            let m = machines[socket.id];

            if (!m) {
                socket.emit('machine-error', {
                    message: 'Máquina no inicializada'
                });
                return;
            }

            const result = stepMachine(m);

            socket.emit('machine-step', {
                tape: [...m.tapeArray],
                headPosition: m.head,
                currentState: m.currentState.name,
                step: m.step,
                activeTransition: result.transition?.id || null
            });

            if (result.status !== 'running') {
                socket.emit(`machine-${result.status}`, result);
                socket.emit('machine-finished', result);
            }
        });

        
        socket.on('stop-machine', () => {
            if (machines[socket.id]) {
                machines[socket.id].running = false;
            }
        });

        socket.on('disconnect', () => {
            delete machines[socket.id];
        });
    });
}

module.exports = simulationSocket;