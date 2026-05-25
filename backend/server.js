const express = require('express');
const cors = require('cors');

const http = require('http');

const { Server } = require('socket.io');

const authRoutes = require('./routes/auth.routes.js');
const machinesRoutes = require('./routes/machines.routes');


const simulationSocket = require(
    './sockets/simulation.socket'
);

require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(express.json());
app.use('/machines', machinesRoutes);

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.json({
        status: 'API running'
    });
});

/* =========================
    SOCKET SERVER
========================= */

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

simulationSocket(io);

/* =========================
    START SERVER
========================= */

server.listen(PORT, () => {
    console.log(
        'Server running on port ' + PORT
    );
});