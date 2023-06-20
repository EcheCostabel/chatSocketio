import express from 'express';
import http from 'http'
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', socket => {


    socket.on('message', (body) => {
        
        const message = {
            body,
            from: socket.id
        };
        io.emit('message', message); // Usa io.emit en lugar de socket.broadcast.emit
    });
});

server.listen(4000);
console.log('Server on port', 4000);