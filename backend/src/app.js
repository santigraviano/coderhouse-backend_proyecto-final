const server = require('./server')
const config = require('./config')
const db = require('./services/mongoose')

// MongoDB connection
db.connect().then(() => {

  // App start
  server.listen(config.port, () => {
    console.log(`Server listening at ${config.port}`)
  })
  
})
.catch(err => console.log(err))