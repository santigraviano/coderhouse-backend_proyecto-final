const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)
const { Schema, model } = mongoose

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
  items: [itemSchema],
  status: { type: String, enum: ['generada', 'enviada', 'completada', 'reclamo'], default: 'generada' },
  timestamps: { type: Date, default: Date.now }
}, {
  versionKey: false,
  toJSON: {
    getters: true
  }
})

schema.plugin(AutoIncrement, { inc_field: 'number' })

module.exports = model('Order', schema)