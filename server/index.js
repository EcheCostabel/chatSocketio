import express from 'express';
import http from 'http'
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', socket => {
    console.log('Client connected')

    socket.on('message', (data) => { //este message escucha al front
        socket.broadcast.emit('message', data)
        console.log( data)
    })
})

server.listen(4000);
console.log('Server on port', 4000);