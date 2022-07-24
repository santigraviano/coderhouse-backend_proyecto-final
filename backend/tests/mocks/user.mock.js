const faker = require('faker')
const bcrypt = require('bcrypt')
const User = require('../../src/models/User')

const getSingleMock = () => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email().toLowerCase(),
  password: faker.internet.password(),
  phone: faker.phone.phoneNumber()
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
    return await User.create(getMock())
  }
  else {
    return await User.insertMany(getMock(quantity))
  }
}

module.exports = {
  getMock,
  insertMock
}