const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cookieParser = require('cookie-parser');
const { v4: uuid } = require('uuid');
const cors = require('cors');
const random = require('./utils/random');

app.use(cookieParser());
app.use(cors());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/payment', (req, res) => {
    const { delay = false } = req.query;
    const socket = io.sockets.clients().sockets[req.cookies.io];
    const id = uuid();

    setTimeout(() => {
        socket.emit('paymentCreated', { id, payload: {} });
    }, delay ? Number(delay) : random(1000, 10000));

    res.json({
        id,
        payload: {},
    });
});

io.on('connection', (socket) => {
    console.log('user connected:', socket.id);

    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
    });
});

http.listen(3000, () => {
    console.log('Running at 3000 port');
});
