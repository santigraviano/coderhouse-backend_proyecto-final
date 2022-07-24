const faker = require('faker')
const Product = require('../../src/models/Product')

const getSingleMock = (category) => ({
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price: faker.commerce.price(),
  picture: 'http://d3ugyf2ht6aenh.cloudfront.net/stores/333/287/products/pac012-red-21-2f3c57ba549f81ee3a15967521447368-640-0.jpg',
  category
})

const getMock = (category, quantity = 1) => {
  if (quantity === 1) {
    return getSingleMock(category)
  }
  else {
    let items = []
    for (let i = 0; i < quantity; i++) {
      items.push(getSingleMock(category))
    }
    return items
  }
}

const insertMock = async (category, quantity = 1) => {
  if (quantity === 1) {
    return await Product.create(getMock(category))
  }
  else {
    return await Product.insertMany(getMock(category, quantity))
  }
}

module.exports = {
  getMock,
  insertMock
}