const mongoose = require('mongoose')
const config = require('../../config')

const connect = async () => {
  await mongoose.connect(config.database.mongo.url, { useNewUrlParser: true, useUnifiedTopology: true })
  console.log(`Database connection at ${config.database.mongo.url} established`)
}

const disconnect = async () => {
  await mongoose.connection.close(true)
}

module.exports = {
  connect,
  disconnect
}