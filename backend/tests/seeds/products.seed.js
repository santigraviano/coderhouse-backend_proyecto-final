const mock = require('../mocks/product.mock')

class ProductsSeeder {
  async run() {
    await mock.insertMock('category1', 5)
    await mock.insertMock('category2', 5)
  }
}

module.exports = new ProductsSeeder