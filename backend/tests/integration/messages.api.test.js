const db = require('../../src/services/mongoose')
const request = require('supertest')
const server = require('../../src/server')
const Message = require('../../src/models/Message')
const mock = require('../mocks/message.mock')

beforeAll(async () => {
  await db.connect()
  await Message.deleteMany({})
})

afterAll(async () => {
  await db.disconnect()
})

beforeEach(async () => {
  
})

afterEach(async () => {
  await Message.deleteMany({})
})

test('GET /api/messages', async () => {
  const messages = await mock.insertMock(2)

  const response = await request(server)
    .get('/api/messages')

    // Check data format
  expect(Array.isArray(response.body)).toBeTruthy()
  expect(response.body.length).toEqual(2)

  // Check response data
  expect(response.body[0].email).toBe(messages[0].email)
  expect(response.body[0].type).toBe(messages[0].type)
  expect(response.body[0].content).toBe(messages[0].content)
  
  expect(response.body[1].email).toBe(messages[1].email)
  expect(response.body[1].type).toBe(messages[1].type)
  expect(response.body[1].content).toBe(messages[1].content)
})

test('GET /api/messages/:id', async () => {
  const message = await mock.insertMock()

  const response = await request(server)
    .get(`/api/messages/${message._id}`)

  // Check response data
  expect(response.body.email).toBe(message.email)
  expect(response.body.type).toBe(message.type)
  expect(response.body.content).toBe(message.content)
})

test('POST /api/messages', async () => {
  const message = mock.getMock()

  const response = await request(server)
    .post('/api/messages')
    .send(message)

  // Check response data
  expect(response.body.email).toBe(message.email)
  expect(response.body.type).toBe(message.type)
  expect(response.body.content).toBe(message.content)

  // Check database data
  const dbMessage = await Message.findById(response.body._id)
  expect(dbMessage.email).toBe(message.email)
  expect(dbMessage.type).toBe(message.type)
  expect(dbMessage.content).toBe(message.content)
})

test('PUT /api/messages/:id', async () => {
  const message = await mock.insertMock()
  const newData = mock.getMock()

  const response = await request(server)
    .put(`/api/messages/${message._id}`)
    .send(newData)

  // Check response data
  expect(response.body.email).toBe(newData.email)
  expect(response.body.type).toBe(newData.type)
  expect(response.body.content).toBe(newData.content)

  // Check database data
  const dbMessage = await Message.findById(message._id)
  expect(dbMessage.email).toBe(newData.email)
  expect(dbMessage.type).toBe(newData.type)
  expect(dbMessage.content).toBe(newData.content)
})

test('DELETE /api/messages/:id', async () => {
  const message = await mock.insertMock()

  const response = await request(server)
    .delete(`/api/messages/${message._id}`)

  // Check response data
  expect(response.body.email).toBe(message.email)
  expect(response.body.type).toBe(message.type)
  expect(response.body.content).toBe(message.content)

  // Check database data
  const dbMessage = await Message.findById(message._id)
  expect(dbMessage).toBe(null)
})

test('GET /api/messages filtered by email', async () => {
  const inserts = await mock.insertMock(3)
  const messages = await Message.insertMany(mock.getMock(3).map(i => {
    i.email = inserts[0].email
    return i
  }))

  const response = await request(server)
    .get(`/api/messages?email=${inserts[0].email}`)

    // Check data format
  expect(Array.isArray(response.body)).toBeTruthy()
  expect(response.body.length).toEqual(4)
})