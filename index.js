const server = require('http').createServer();
const io = require('socket.io')(server);

io.on('connection', client => {
    client.name
    console.log('connect')

    
        setInterval(()=> {
            console.log('test')
            client.emit('test', 'ohyeah')
        }, 1000)
});

// server.listen(process.env.PORT);
server.listen(5000);

io.on('connection', socket => {
    console.log('user has connected')

    socket.emit('testing')

    socket.on('newUser', credentials => {
        const { name, password } = credentials
        Promise.all([
            User.findOrcCreate({
                where: {
                    name,
                    password
                }
            }).
            User.findAll()
        ])
        .then(([user, users]) => {
            mobileSockets[user[0].id] = socket.id
            socket.emit('userCreated', { user: user[0], users })
            socket.broadcast.emit('newUser', user[0])
        })
        .catch(err => {
            console.log(err)
        })
    })
    socket.on('chat', users => {
        Conversation.findOrcCreate(users.user.id, users.receiver.id)
            .then(conversation => socket.emit('priorMessages', conversation.messages))
    })
    socket.on('message', ({ text, sender, receiver }) => {
        Message.createMessage(text, sender, receiver)
            .then(message => {
                socket.emit('incomingMessage', message)
                const receiverSocketId = mobileSockets[receiver.id]
                socket.to(receiverSocketId).emit('incomingMessages', message)
            })
    })
})