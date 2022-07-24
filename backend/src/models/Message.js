const { Schema, model } = require('mongoose')

const schema = new Schema({
  email: { type: String, required: true },
  type: { type: String, enum: ['user', 'system'], required: true },
  content: { type: String, required: true },
  timestamps: { type: Date, default: Date.now }
}, {
  versionKey: false,
  toJSON: {
    getters: true
  }
})

module.exports = model('Message', schema)