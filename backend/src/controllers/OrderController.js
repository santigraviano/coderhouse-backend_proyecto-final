const Order = require('../models/Order')
const { sendNewOrderEmail } = require('../services/nodemailer')

class OrderController {
  async store(req, res, next) {
    try {
      const { email, items } = req.body

      const order = await Order.create({ email, items })

      await sendNewOrderEmail({ email, items })
      
      res.json(order)
    }
    catch(error) {
      next(error)
    }
  }
}

module.exports = new OrderController