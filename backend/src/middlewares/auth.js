const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const authorization = req.get('authorization')
  let token = null

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET)


  if (!token || !decodedToken.id) {
    throw new Error('JsonWebTokenError')
  }

  req.userId = decodedToken.id

  next()
}