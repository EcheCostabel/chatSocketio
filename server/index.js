import express from 'express';
import http from 'http'
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', socket => {

    // socket.broadcast.emit('message', { //Esto es para mandarle un mensaje que se conecto un usuario a todos menos al que se conecto
    //     user: 'Info',
    //     message: 'New user connected'
    // })


    socket.on('message', (body) => {
        io.emit('message', body); 
    });
});

server.listen(4000);
console.log('Server on port', 4000);