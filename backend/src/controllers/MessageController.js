const Message = require('../models/Message')
const { broadcast } = require('../services/socketio')

class MessageController {
  async index(req, res, next) {
    try {
      const { email } = req.query

      let filters = {}
      if (email) {
        filters.email = email
      }

      const messages = await Message.find(filters)
      res.json(messages)
    }
    catch(error) {
      next(error)
    }
  }

  async show(req, res, next) {
    try {
      const { id } = req.params
      const message = await Message.findById(id)
      res.json(message)
    }
    catch(error) {
      next(error)
    }
  }

  async store(req, res, next) {
    try {
      const { body } = req
      const message = await Message.create(body)
      broadcast('message:create', JSON.stringify(message))
      res.json(message)
    }
    catch(error) {
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params
      const { body } = req
      const message = await Message.findByIdAndUpdate(id, body, { returnDocument: 'after' })
      res.json(message)
    }
    catch(error) {
      next(error)
    }
  }

  async destroy(req, res, next) {
    try {
      const { id } = req.params
      const message = await Message.findByIdAndDelete(id)
      res.json(message)
    }
    catch(error) {
      next(error)
    }
  }
}

module.exports = new MessageController