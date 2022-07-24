const { Schema, model } = require('mongoose')

const schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: {
    type: Schema.Types.Decimal128,
    transform: v => v.toString(),
    required: true
  },
  picture: { type: String, required: true },
  category: { type: String, required: true },
  timestamps: { type: Date, default: Date.now }
}, {
  versionKey: false,
  toJSON: {
    getters: true
  }
})

module.exports = model('Product', schema)