const Product = require('../models/Product')

class ProductController {
  async index(req, res, next) {
    try {
      const { category } = req.query
      
      let filters = {}
      if (category) {
        filters.category = category
      }

      const products = await Product.find(filters)
      res.json(products)
    }
    catch(error) {
      next(error)
    }
  }

  async show(req, res, next) {
    try {
      const { id } = req.params
      const product = await Product.findById(id)

      if (product != null) {
        res.json(product)
      }
      else {
        res.status(404)
        res.json({
          message: 'Product not found'
        })
      }
      
    }
    catch(error) {
      next(error)
    }
  }

  async store(req, res, next) {
    try {
      const product = await Product.create(req.body)
      res.json(product)
    }
    catch(error) {
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params
      const product = await Product.findByIdAndUpdate(id, req.body, { returnDocument: 'after' })
      res.json(product)
    }
    catch(error) {
      next(error)
    }
  }

  async destroy(req, res, next) {
    try {
      const { id } = req.params
      const product = await Product.findByIdAndDelete(id)
      res.json(product)
    }
    catch(error) {
      next(error)
    }
  }
}

module.exports = new ProductController()