const { Server } = require('socket.io')

let io

const connect = (server) => {
  io = new Server(server, {
    cors: {
      origin: '*'
    }
  })

  io.on('connection', () => {
    console.log('Client connected')
  })
}

const broadcast = (event, data) => {
  io.emit(event, data)
}

module.exports = {
  connect,
  broadcast
}