const faker = require('faker')
const Order = require('../../src/models/Order')

const getSingleMock = (items = []) => ({
  email: faker.internet.email(),
  status: 'generada',
  items: items !== [] && items.map(product => ({ name: product.name, description: product.description, price: product.price, picture: product.picture, quantity: 1 }))
})

const getMock = (items, quantity = 1) => {
  if (quantity === 1) {
    return getSingleMock(items)
  }
  else {
    let items = []
    for (let i = 0; i < quantity; i++) {
      items.push(getSingleMock(items))
    }
    return items
  }
}

const insertMock = async (items, quantity = 1) => {
  if (quantity === 1) {
    return await Order.create(getMock(items))
  }
  else {
    return await Order.insertMany(getMock(items, quantity))
  }
}

module.exports = {
  getMock,
  insertMock
}