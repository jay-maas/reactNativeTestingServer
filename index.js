const express = require('express');
const cors = require('cors')
const server = express();
const http = require('http').createServer(server)
const io = require('socket.io')(http)


server.use(cors())
server.use(express.json())

server.get('/', (req, res) => {
    res.json({ message: `The server is on and waiting for requests...`})
})

io.on('connection', socket => {
    console.log('A user connected.');
  
    socket.on('sendMessage', msg => {
      io.emit('sendMessage', msg);
    });
  
    socket.on('disconnect', () => {
      console.log('A user disconnected.');
    });
  });

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n** server up on port ${port} **\n`))