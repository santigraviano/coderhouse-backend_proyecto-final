const request = require('supertest')
const jwt = require('jsonwebtoken')
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

test('POST /api/auth/signup', async () => {
  const user = await mock.getMock()

  const response = await request(server)
    .post('/api/auth/signup')
    .send(user)

  // Check response data
  expect(response.body.first_name).toBe(user.first_name)
  expect(response.body.last_name).toBe(user.last_name)
  expect(response.body.email).toBe(user.email)
  expect(response.body.phone).toBe(user.phone)

  // Check token data
  const decodedToken = jwt.verify(response.body.token, process.env.JWT_SECRET)
  expect(decodedToken.id).toBe(response.body._id)

  // Check database data
  const dbUser = await User.findById(response.body._id)
  expect(dbUser.first_name).toBe(user.first_name)
  expect(dbUser.last_name).toBe(user.last_name)
  expect(dbUser.email).toBe(user.email)
  expect(dbUser.phone).toBe(user.phone)
})

test('POST /api/auth/signin', async () => {
  const userMock = await mock.getMock()

  const user = await User.create({
    first_name: userMock.first_name,
    last_name: userMock.last_name,
    email: userMock.email,
    phone: userMock.phone,
    password: bcrypt.hashSync(userMock.password, 10),
  })

  const response = await request(server)
    .post('/api/auth/signin')
    .send({
      email: userMock.email,
      password: userMock.password
    })

  // Check response data
  expect(response.body.first_name).toBe(user.first_name)
  expect(response.body.last_name).toBe(user.last_name)
  expect(response.body.email).toBe(user.email)
  expect(response.body.phone).toBe(user.phone)
  
  // Check token data
  const decodedToken = jwt.verify(response.body.token, process.env.JWT_SECRET) 
  expect(decodedToken.id).toBe(user.id)
})

test('Protected route GET /api/users without authorization', async () => {
  const response = await request(server)
    .get('/api/users')

  expect(response.status).toBe(401)
})

test('Protected route GET /api/users with authorization', async () => {
  const token = await jwt.sign({ id: 'someid' }, process.env.JWT_SECRET)

  const response = await request(server)
    .get('/api/users')
    .set('Authorization', `Bearer ${token}`)

  expect(response.status).toBe(200)
})