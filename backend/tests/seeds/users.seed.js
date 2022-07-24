const bcrypt = require('bcrypt')
const User = require('../../src/models/User')
const cartMock = require('../mocks/cart.mock')

class ProductsSeeder {
  async run() {
    const cart = await cartMock.insertMock()
    await User.create({
      firstName: 'Santiago',
      lastName: 'Graviano',
      phone: '+5491122546911',
      email: 'santiago.graviano@gmail.com',
      password: (await bcrypt.hash('123asd', 10)),
      cart: cart.id
    })
  }
}

module.exports = new ProductsSeeder