const jwt = require('jsonwebtoken')
const config = require('../../config')

const getToken = async (payload) => {
  const token = await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: config.session.expirationTime
  })

  return token
}

module.exports = {
  getToken
}