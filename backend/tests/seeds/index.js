const mongoose = require('../../src/services/mongoose')
const ProductsSeeder = require('./products.seed')
const UsersSeeder = require('./users.seed')

const seed = async () => {
  console.log('Starting seed')

  await mongoose.connect()

  await ProductsSeeder.run()
  // await UsersSeeder.run()

  console.log('Seed finished')

  await mongoose.disconnect()
}

seed()