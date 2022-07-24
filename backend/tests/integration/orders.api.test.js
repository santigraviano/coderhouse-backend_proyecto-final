const db = require('../../src/services/mongoose')
const auth = require('../../src/services/auth')
const request = require('supertest')
const server = require('../../src/server')
const Order = require('../../src/models/Order')
const Product = require('../../src/models/Product')
const mock = require('../mocks/order.mock')
const productMock = require('../mocks/product.mock')
const userMock = require('../mocks/user.mock')
const cartMock = require('../mocks/cart.mock')

let products

beforeAll(async () => {
  await db.connect()
  await Order.deleteMany({})
  await Product.deleteMany({})
})

afterAll(async () => {
  await Order.deleteMany({})
  await Product.deleteMany({})
  await db.disconnect()
})

beforeEach(async () => {
  products = (await productMock.insertMock('testing', 2)).map(p => p.toJSON())
})

afterEach(async () => {
  await Product.deleteMany({})
})

test('POST /api/orders', async () => {
  const { email, items } = (await cartMock.insertMock(products)).toJSON()

  const response = await request(server)
    .post('/api/orders')
    .send({ email, items })

  expect(response.body.email).toBe(email)
  expect(response.body.status).toBe('generada')
  expect(response.body.items[0].productId).toBe(items[0].productId)
  expect(response.body.items[0].name).toBe(items[0].name)
  expect(response.body.items[0].description).toBe(items[0].description)
  expect(response.body.items[0].price).toBe(items[0].price)
  expect(response.body.items[0].picture).toBe(items[0].picture)
  expect(response.body.items[1].productId).toBe(items[1].productId)
  expect(response.body.items[1].name).toBe(items[1].name)
  expect(response.body.items[1].description).toBe(items[1].description)
  expect(response.body.items[1].price).toBe(items[1].price)
  expect(response.body.items[1].picture).toBe(items[1].picture)
})