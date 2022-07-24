const Cart = require('../models/Cart')
const Product = require('../models/Product')

class CartController {
  async show(req, res, next) {
    try {
      const { id } = req.params
      const cart = await Cart.findById(id)
      res.json(cart)
    }
    catch (error) {
      next(error)
    }
  }

  async storeItem(req, res, next) {
    try {
      const { id } = req.params
      const cart = await Cart.findById(id)

      if (!cart) {
        throw new Error('CartNotFound')
      }
      
      const { productId, quantity } = req.body
      const product = await Product.findById(productId)

      if (!product) {
        throw new Error('ProductNotFound')
      }

      cart.items.push({
        productId: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        picture: product.picture,
        quantity
      })

      await cart.save()
      res.json(cart)
    }
    catch (error) {
      next(error)
    }
  }

  async updateItem(req, res, next) {
    try {
      const { id } = req.params
      const cart = await Cart.findById(id)

      const { itemId, quantity } = req.body

      cart.items.id(itemId).quantity = quantity

      await cart.save()
      res.json(cart)
    }
    catch (error) {
      next(error)
    }
  }

  async destroyItem(req, res, next) {
    try {
      const { id } = req.params
      const cart = await Cart.findById(id)

      const { itemId } = req.body

      cart.items.id(itemId).remove()

      await cart.save()
      res.json(cart)
    }
    catch (error) {
      next(error)
    }
  }

  async emptyItems(req, res, next) {
    const { id } = req.params
    const cart = await Cart.findById(id)

    cart.items = []

    await cart.save()
    res.json(cart)
  }
}

module.exports = new CartController