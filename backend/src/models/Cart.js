const { Schema, model } = require('mongoose')

const itemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: {
    type: Schema.Types.Decimal128,
    transform: v => v.toString(),
    required: true
  },
  picture: { type: String, required: true },
  quantity: { type: Number },
}, {
  versionKey: false,
  toJSON: {
    getters: true
  }
})

const schema = new Schema({
  email: { type: String, required: true },
  address: { type: String },
  items: [itemSchema],
  timestamps: { type: Date, default: Date.now }
}, {
  versionKey: false,
  toJSON: {
    getters: true
  }
})

module.exports = model('Cart', schema)