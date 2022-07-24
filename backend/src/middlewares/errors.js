module.exports = (err, req, res, next) => {
  console.error(err)

  const DEFAULT_ERROR_RESPONSE = {
    code: 500,
    message: 'Internal server error'
  }

  const ERROR_RESPONSES = {
    'JsonWebTokenError': {
      code: 401,
      message: 'Missing or invalid token'
    }
  }
  
  const errorResponse = ERROR_RESPONSES[err.name] || DEFAULT_ERROR_RESPONSE

  res.status(errorResponse.code).render('error.ejs', { ...errorResponse, err, stack: err.stack })
}