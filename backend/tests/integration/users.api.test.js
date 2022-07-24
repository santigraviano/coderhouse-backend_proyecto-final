const request = require('supertest')
const bcrypt = require('bcrypt')
const server = require('../../src/server')
const mongoose = require('../../src/services/mongoose')
const User = require('../../src/models/User')
const mock = require('../mocks/user.mock')

beforeAll(async () => {
  await mongoose.connect()
  await User.deleteMany({})
})

afterAll(async () => {
  await User.deleteMany({})
  await mongoose.disconnect()
})

test('GET /api/users', async () => {
  const users = await mock.insertMock(5)

  const response = await request(server)
    .get('/api/users')

  expect(Array.isArray(response.body)).toBeTruthy()
  expect(response.body.length).toBe(5)
})

test('GET /api/users/:id', async () => {
  const user = await mock.insertMock()

  const response = await request(server)
    .get(`/api/users/${user._id}`)

  expect(response.body.firstName).toBe(user.firstName)
  expect(response.body.lastName).toBe(user.lastName)
  expect(response.body.email).toBe(user.email)
  expect(response.body.phone).toBe(user.phone)
  expect(response.body.password).toBe(user.password)
})

test('POST /api/users', async () => {
  const user = mock.getMock()

  const response = await request(server)
    .post('/api/users')
    .send(user)

  // Check response data
  expect(response.body.firstName).toBe(user.firstName)
  expect(response.body.lastName).toBe(user.lastName)
  expect(response.body.email).toBe(user.email)
  expect(response.body.phone).toBe(user.phone)
  expect(bcrypt.compareSync(user.password, response.body.password)).toBeTruthy()

  // Check database data
  const dbUser = await User.findById(response.body._id).lean()
  expect(dbUser.firstName).toBe(user.firstName)
  expect(dbUser.lastName).toBe(user.lastName)
  expect(dbUser.email).toBe(user.email)
  expect(dbUser.phone).toBe(user.phone)
  expect(bcrypt.compareSync(user.password, dbUser.password)).toBeTruthy()
})

test('PUT /api/users/:id', async () => {
  const user = await mock.insertMock()
  const newData = mock.getMock()

  const response = await request(server)
    .put(`/api/users/${user._id}`)
    .send(newData)

  // Check response data
  expect(response.body.firstName).toBe(newData.firstName)
  expect(response.body.lastName).toBe(newData.lastName)
  expect(response.body.email).toBe(newData.email)
  expect(response.body.phone).toBe(newData.phone)
  expect(bcrypt.compareSync(newData.password, response.body.password)).toBeTruthy()

  // Check database data
  const dbUser = await User.findById(user._id).lean()
  expect(dbUser.firstName).toBe(newData.firstName)
  expect(dbUser.lastName).toBe(newData.lastName)
  expect(dbUser.email).toBe(newData.email)
  expect(dbUser.phone).toBe(newData.phone)
  expect(bcrypt.compareSync(newData.password, dbUser.password)).toBeTruthy()
})

test('DELETE /api/users/:id', async () => {
  const user = await mock.insertMock()

  const response = await request(server)
    .delete(`/api/users/${user._id}`)

  // Check response data
  expect(response.body.firstName).toBe(user.firstName)
  expect(response.body.lastName).toBe(user.lastName)
  expect(response.body.email).toBe(user.email)
  expect(response.body.phone).toBe(user.phone)
  //expect(bcrypt.compareSync(user.password, response.body.password)).toBeTruthy()

  // Check database data
  const dbUser = await User.findById(user._id).lean()
  expect(dbUser).toBe(null)
})