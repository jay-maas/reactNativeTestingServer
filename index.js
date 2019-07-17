// // const http = require('http')
// // const express = require('express')
// const conn = require('./db').conn
// // const io = require('socket.io')(server)
// // const { User, Conversation, Message } = require('./db').models
// conn.sync({ logging: false, force: true })
// const cors = require('cors')
// const express = require("express")
// const http = require("http")
// const socketIo = require("socket.io")
// // const axios = require("axios")
// const port = process.env.PORT || 3000
// const index = require("./routes/index")


// const corsOptions = {
//     credentials: false,
//     origin: 'http://localhost:19002'
// }

// // app.use(cors(corsOptions))
// // app.use(express())
// // app.use(index)

// const server = http.createServer();
// const io = socketIo(server);

// const mobileSockets = {}

// io.on('connection', socket => {
//     console.log('a user connected')
// })

// server.listen(port, () => console.log(`Listening on port ${port}`));

// // io.on('connection', socket => {
// //     console.log('user has connected')

// //     socket.emit('testing')

// //     socket.on('newUser', credentials => {
// //         const { name, password } = credentials
// //         Promise.all([
// //             User.findOrcCreate({
// //                 where: {
// //                     name,
// //                     password
// //                 }
// //             }).
// //             User.findAll()
// //         ])
// //         .then(([user, users]) => {
// //             mobileSockets[user[0].id] = socket.id
// //             socket.emit('userCreated', { user: user[0], users })
// //             socket.broadcast.emit('newUser', user[0])
// //         })
// //         .catch(err => {
// //             console.log(err)
// //         })
// //     })
// //     socket.on('chat', users => {
// //         Conversation.findOrcCreate(users.user.id, users.receiver.id)
// //             .then(conversation => socket.emit('priorMessages', conversation.messages))
// //     })
// //     socket.on('message', ({ text, sender, receiver }) => {
// //         Message.createMessage(text, sender, receiver)
// //             .then(message => {
// //                 socket.emit('incomingMessage', message)
// //                 const receiverSocketId = mobileSockets[receiver.id]
// //                 socket.to(receiverSocketId).emit('incomingMessages', message)
// //             })
// //     })
// // })

// const server = require('http').createServer().listen(3000);
// const conn = require('./db').conn;
// const io = require('socket.io')(server);
// const { User, Conversation, Message } = require('./db').models;
// conn.sync({ logging: false, force: true });
// const mobileSockets = {};

// io.on('connection', socket => {
//     console.log('connected')
//   socket.on('newUser', credentials => {
//     const { name, password } = credentials;
//     Promise.all([
//       User.findOrCreate({
//         where: {
//           name,
//           password
//         }
//       }),
//       User.findAll()
//     ])
//       .then(([user, users]) => {
//         mobileSockets[user[0].id] = socket.id;
//         socket.emit('userCreated', { user: user[0], users });
//         socket.broadcast.emit('newUser', user[0]);
//       });
//   });

//   socket.on('chat', users => {
//     Conversation.findOrCreateConversation(users.user.id, users.receiver.id)
//       .then(conversation => socket.emit('priorMessages', conversation.messages));
//   });

//   socket.on('message', ({ text, sender, receiver }) => {
//     Message.createMessage(text, sender, receiver)
//       .then(message => {
//         socket.emit('incomingMessage', message);
//         const receiverSocketId = mobileSockets[receiver.id];
//         socket.to(receiverSocketId).emit('incomingMessage', message);
//       });
//   });
// });


// const express = require('express')
// const cors = require('cors')

// const app = express()

// const server = require('http').Server(app)
// const socket = require('socket.io-client')('http://localhost')

// socket.on('connect', () => {
//     console.log('connect')
// })

// app.use((req, res, next) => {
//     req.io = io;
  
//     return next();
//   });

// app.use(cors())
// app.use(express.json())
// app.use(require("./routes"));

// server.listen(3000, () => {
//     console.log('Server Started on 3000')
// })

const server = require('http').createServer();
const io = require('socket.io')(server);

io.on('connection', client => {
    console.log('connect')

    client.emit('test', 'test')
});

server.listen(process.env.PORT);