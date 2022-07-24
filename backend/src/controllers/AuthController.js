const bcrypt = require('bcrypt')
const auth = require('../services/auth')
const mailer = require('../services/nodemailer')
const User = require('../models/User')
const Cart = require('../models/Cart')

class AuthController {

  async register(req, res, next) {
    try {
      const { firstName, lastName, email, password, phone } = req.body

      if (!(firstName && lastName && email && password && phone)) {
        return res.status(400).send('All fields are required')
      }

      const userExists = await User.findOne({ email })

      if (userExists) {
        return res.status(400).send('Email already taken')
      }

      const encryptedPassword = await bcrypt.hash(password, 10)
      
      const cart = await Cart.create({
        email: email.toLowerCase()
      })

      const user = (await User.create({
        firstName,
        lastName,
        email: email.toLowerCase(),
        password: encryptedPassword,
        phone,
        cart: cart.id
      })).toJSON()

      await mailer.sendNewUserEmail(user)

      const payload = { id: user._id }
      const token = await auth.getToken(payload)
      
      user.token = token

      return res.json(user)
    }
    catch (error) {
      next(error)
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body

      if (!(email && password)) {
        return res.status(400).send('Email and password required')
      }

      const user = (await User.findOne({ email })).toJSON()
      const passwordIsValid = await bcrypt.compare(password, user.password)

      if (!(user && passwordIsValid)) {
        return res.json({ error: 'Email or password invalid' })
      }

      const payload = { id: user._id }
      const token = await auth.getToken(payload)

      user.token = token

      return res.json(user)
    }
    catch (error) {
      next(error)
    }
  }
}

module.exports = new AuthController