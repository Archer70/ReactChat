const io = require('socket.io')()

const onlineUsers = {};

io.on('connection', socket => {
    updateUserCount()
    updateUserList()

    socket.on('login', name => {
        login(name, socket)
    })

    socket.on('chat-message', message => {
        socket.broadcast.emit('chat-message', message)
    })

    socket.on('disconnect', () => {
        disconnect(socket)
    })
})

function login(name, socket) {
    if (Object.values(onlineUsers).includes(name)) {
        socket.emit('login-name-in-use')
    } else {
        onlineUsers[socket.client.id] = name
        socket.emit('login-success')
        socket.broadcast.emit('user-joined', name)
        updateUserCount()
        updateUserList()
    }
}

function disconnect(socket) {
    if (onlineUsers[socket.client.id]) {
        socket.broadcast.emit('user-disconnected', onlineUsers[socket.client.id]);
    }
    delete onlineUsers[socket.client.id]
    updateUserCount()
    updateUserList()
}

function updateUserCount() {
    io.emit('user-count-update', Object.keys(onlineUsers).length)
}

function updateUserList() {
    io.emit('user-list-update', Object.values(onlineUsers))
}

io.listen(3123)
console.log('socket open on port 3123')