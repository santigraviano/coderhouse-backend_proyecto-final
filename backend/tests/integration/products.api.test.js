const db = require('../../src/services/mongoose')
const request = require('supertest')
const server = require('../../src/server')
const Product = require('../../src/models/Product')
const mock = require('../mocks/product.mock')

const categories = ['category1', 'category2']

beforeAll(async () => {
  await db.connect()
})

afterAll(async () => {
  await db.disconnect()
})

beforeEach(async () => {

})

afterEach(async () => {
  await Product.deleteMany({})
})

test('GET /api/products', async () => {
  const products = await mock.insertMock(categories[0], 2)

  const response = await request(server)
    .get('/api/products')

  // Check response format
  expect(Array.isArray(response.body)).toBeTruthy()
  expect(response.body.length).toEqual(2)

  // Check response data
  expect(response.body[0].name).toBe(products[0].name)
  expect(response.body[0].description).toBe(products[0].description)
  expect(response.body[0].price).toBe(products[0].price)
  expect(response.body[0].picture).toBe(products[0].picture)
  expect(response.body[0].category).toBe(categories[0])

  expect(response.body[1].name).toBe(products[1].name)
  expect(response.body[1].description).toBe(products[1].description)
  expect(response.body[1].price).toBe(products[1].price)
  expect(response.body[1].picture).toBe(products[1].picture)
  expect(response.body[1].category).toBe(categories[0])
})

test('GET /api/products/:id', async () => {
  const product = await mock.insertMock(categories[0])

  const response = await request(server)
    .get(`/api/products/${product._id}`)

  // Check response data
  expect(response.body.name).toBe(product.name)
  expect(response.body.description).toBe(product.description)
  expect(response.body.price).toBe(product.price)
  expect(response.body.picture).toBe(product.picture)
  expect(response.body.category).toBe(categories[0])
})

test('POST /api/products', async () => {
  const product = await mock.getMock(categories[0])

  const response = await request(server)
    .post('/api/products')
    .send(product)

  // Check response data
  expect(response.body.name).toBe(product.name)
  expect(response.body.description).toBe(product.description)
  expect(response.body.price).toBe(product.price)
  expect(response.body.picture).toBe(product.picture)
  expect(response.body.category).toBe(categories[0])

  // Check database data
  const dbProduct = (await (await Product.findById(response.body._id)).populate('category')).toJSON()
  expect(dbProduct.name).toBe(product.name)
  expect(dbProduct.description).toBe(product.description)
  expect(dbProduct.price).toBe(product.price)
  expect(dbProduct.picture).toBe(product.picture)
  expect(dbProduct.category).toBe(categories[0])
})

test('PUT /api/products/:id', async () => {
  const product = await mock.insertMock(categories[0])
  const newData = await mock.getMock(categories[1])

  const response = await request(server)
    .put(`/api/products/${product._id}`)
    .send(newData)

  // Check response data
  expect(response.body.name).toBe(newData.name)
  expect(response.body.description).toBe(newData.description)
  expect(response.body.price).toBe(newData.price)
  expect(response.body.picture).toBe(newData.picture)
  expect(response.body.category).toBe(categories[1])

  // Check database data
  const dbProduct = (await (await Product.findById(product._id)).populate('category')).toJSON()
  expect(dbProduct.name).toBe(newData.name)
  expect(dbProduct.description).toBe(newData.description)
  expect(dbProduct.price).toBe(newData.price)
  expect(dbProduct.picture).toBe(newData.picture)
  expect(dbProduct.category).toBe(categories[1])
})

test('DELETE /api/products/:id', async () => {
  const product = await mock.insertMock(categories[0])

  const response = await request(server)
    .delete(`/api/products/${product._id}`)

  // Check response data
  expect(response.body.name).toBe(product.name)
  expect(response.body.description).toBe(product.description)
  expect(response.body.price).toBe(product.price)
  expect(response.body.picture).toBe(product.picture)
  expect(response.body.category).toBe(categories[0])

  // Check database data
  const dbProduct = await Product.findById(product._id)
  expect(dbProduct).toBe(null)
})

test('GET /api/products/:id with 404 Not Found error', async () => {
  // Insert a new product
  const product = await mock.insertMock(categories[0])

  // Delete the new created product
  await Product.deleteOne({ _id: product._id })

  // Look for the product by id
  const response = await request(server)
    .get(`/api/products/${product._id}`)

  expect(response.status).toBe(404)
  expect(response.body).toMatchObject({
    message: 'Product not found'
  })
})

test('GET /api/products by category name', async () => {
  // Inserts products
  await mock.insertMock(categories[0], 5)
  const products = await mock.insertMock(categories[1], 5)

  const response = await request(server)
    .get(`/api/products?category=${categories[1]}`)

  expect(Array.isArray(response.body)).toBeTruthy()
  expect(response.body.length).toBe(5)
})