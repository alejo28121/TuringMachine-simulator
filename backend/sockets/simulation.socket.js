const {
    executeMachine
} = require('../services/simulation.service');

const runningMachines = {};

function simulationSocket(io){
    io.on('connection', (socket) => {
        console.log('Cliente conectado:', socket.id);
        socket.on(
            'run-machine',
            async (machineData) => {
                try{
                    runningMachines[socket.id] = true;
                    const result =
                        await executeMachine(
                            machineData,
                            socket,
                            runningMachines
                        );
                    socket.emit(
                        'machine-finished',
                        result
                    );
                }catch(error){
                    runningMachines[socket.id] = false;
                    socket.emit(
                        'machine-error',
                        {
                            message: error.message
                        }
                    );
                }
            }
        );
        socket.on('stop-machine', () => {
                runningMachines[socket.id] = false;
            }
        );
        socket.on('disconnect', () => {
                console.log('Cliente desconectado');
                delete runningMachines[socket.id];
            }
        );
    });
}

module.exports = simulationSocket;