const { Schema, model } = require('mongoose')

const schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  cart: {
    type: Schema.Types.ObjectId,
    ref: 'Cart'
  },
  timestamps: { type: Date, default: Date.now }
}, {
  versionKey: false,
  toJSON: {
    getters: true
  }
})

module.exports = model('User', schema)