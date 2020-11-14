const Express = require('express')
const axios = require('@nuxtjs/axios')
const app = new Express()

const http = require('http').Server(app,{ origins: '*:*'})
const options = {
  cors:true,
  // origins:["*:*"]

  // origins:["http://localhost:3000"]
};
const io = require('socket.io')(http, options)
// const io = require('socket.io')(http)


const port = 3001

io.on('connection', function (socket) {
  // connected io success
  console.log('connected : ID =>', socket.id)
  socket.on('sendMessage', (msg) => {
    io.emit('sendMessage', "Socket id: "+socket.id+"  Message: "+msg)
  })

  socket.on('randCat', (msg) => {
    io.emit('randCat', "Socket id: "+socket.id+"  Message: "+msg)
  })
})

http.listen(port, function () {
  console.log('Socket run on port:', port)
})
