const faker = require('faker')
const Message = require('../../src/models/Message')

const getSingleMock = () => ({
  email: faker.internet.email(),
  type: faker.random.arrayElement(['user', 'system']),
  content: faker.lorem.sentence()
})

const getMock = (quantity = 1) => {
  if (quantity === 1) {
    return getSingleMock()
  }
  else {
    let items = []
    for (let i = 0; i < quantity; i++) {
      items.push(getSingleMock())
    }
    return items
  }
}

const insertMock = async (quantity = 1) => {
  if (quantity === 1) {
    const item = await Message.create(getMock())
    return item.toJSON()
  }
  else {
    const items = await Message.insertMany(getMock(quantity))
    return items.map(i => i.toJSON())
  }
}

module.exports = {
  getMock,
  insertMock
}