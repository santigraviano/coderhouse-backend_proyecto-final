const bcrypt = require('bcrypt')
const User = require('../models/User')

class UserController {
  async index(req, res, next) {
    try {
      const users = await User.findq({})
      res.json(users)
    }
    catch(error) {
      next(error)
    }
  }

  async show(req, res, next) {
    try {
      const { id } = req.params
      const user = await User.findById(id)
      res.json(user)
    }
    catch(error) {
      next(error)
    }
  }

  async store(req, res, next) {
    try {
      const { firstName, lastName, email, password, phone } = req.body
      const hashedPassword = await bcrypt.hash(password, 10) 
      const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phone
      })
      res.json(user)
    }
    catch(error) {
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params
      const { firstName, lastName, email, password, phone } = req.body
      const hashedPassword = await bcrypt.hash(password, 10) 
      const user = await User.findByIdAndUpdate(id, {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phone
      }, {
        returnDocument: 'after' 
      })
      res.json(user)
    }
    catch(error) {
      next(error)
    }
  }

  async destroy(req, res, next) {
    try {
      const { id } = req.params
      const user = await User.findByIdAndDelete(id)
      res.json(user)
    }
    catch(error) {
      next(error)
    }
  }
}

module.exports = new UserController