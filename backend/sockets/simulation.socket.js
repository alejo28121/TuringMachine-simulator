const {
    executeMachine
} = require('../services/simulation.service');

const runningMachines = {};
const machineSpeed = {};

function simulationSocket(io){
    io.on('connection', (socket) => {
        console.log('Cliente conectado:', socket.id);
        socket.on('set-speed', (speed) => {
            machineSpeed[socket.id] = speed;
        });
        socket.on(
            'run-machine',
            async (machineData) => {
                try{
                    runningMachines[socket.id] = true;
                    const speed =
                        machineSpeed[socket.id] || 1000;
                    const result =
                        await executeMachine(
                            machineData,
                            socket,
                            runningMachines,
                            speed
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
                delete machineSpeed[socket.id];
            }
        );
    });
}

module.exports = simulationSocket;