const db = require('../../src/services/mongoose')
const request = require('supertest')
const server = require('../../src/server')
const Cart = require('../../src/models/Cart')
const Product = require('../../src/models/Product')
const mock = require('../mocks/cart.mock')
const productMock = require('../mocks/product.mock')

let products

beforeAll(async () => {
  await db.connect()
  await Cart.deleteMany({})
  await Product.deleteMany({})
})

afterAll(async () => {
  await Cart.deleteMany({})
  await Product.deleteMany({})
  await db.disconnect()
})

beforeEach(async () => {
  products = (await productMock.insertMock('testing', 2)).map(p => p.toJSON())
})

afterEach(async () => {
  await Product.deleteMany({})
})

test('GET /api/carts/:id', async () => {
  const cart = await mock.insertMock(products)

  const response = await request(server)
    .get(`/api/carts/${cart.id}`)

  // Check response data
  expect(response.body.email).toBe(cart.email)
  expect(response.body.address).toBe(cart.address)
  expect(Array.isArray(response.body.items)).toBeTruthy()
  expect(response.body.items.length).toEqual(2)
})

test('POST /api/carts/:id/items', async () => {
  const cart = await mock.insertMock([])
  const product = (await productMock.insertMock('testing')).toJSON()

  const response = await request(server)
    .post(`/api/carts/${cart.id}/items`)
    .send({
      productId: product.id,
      quantity: 1
    })

  // Check response data
  expect(response.body.email).toBe(cart.email)
  expect(response.body.address).toBe(cart.address)
  expect(Array.isArray(response.body.items)).toBeTruthy()
  expect(response.body.items.length).toEqual(1)
  expect(response.body.items[0].productId).toEqual(product.id)
  expect(response.body.items[0].name).toEqual(product.name)
  expect(response.body.items[0].description).toEqual(product.description)
  expect(response.body.items[0].picture).toEqual(product.picture)
  expect(response.body.items[0].price).toEqual(product.price)
  expect(response.body.items[0].quantity).toEqual(1)
})

test('PUT /api/carts/:id/items', async () => {
  const cart = await mock.insertMock(products)
 
  const response = await request(server)
    .put(`/api/carts/${cart.id}/items`)
    .send({
      itemId: cart.items[0].id,
      quantity: 5
    })
  
  // Check response data
  expect(response.body.email).toBe(cart.email)
  expect(response.body.address).toBe(cart.address)
  expect(response.body.items[0].quantity).toEqual(5)
})

test('DELETE /api/carts/:id/items', async () => {
  const cart = await mock.insertMock(products)

  const response = await request(server)
    .delete(`/api/carts/${cart.id}/items`)
    .send({
      itemId: cart.items[0].id
    })

  // Check response data
  expect(response.body.email).toBe(cart.email)
  expect(response.body.address).toBe(cart.address)
  expect(Array.isArray(response.body.items)).toBeTruthy()
  expect(response.body.items.length).toEqual(1)
})

test('PUT /api/carts/:id/empty', async () => {
  const cart = await mock.insertMock(products)

  const response = await request(server)
    .put(`/api/carts/${cart.id}/empty`)

  // Check response data
  expect(response.body.email).toBe(cart.email)
  expect(response.body.address).toBe(cart.address)
  expect(Array.isArray(response.body.items)).toBeTruthy()
  expect(response.body.items.length).toEqual(0)
})