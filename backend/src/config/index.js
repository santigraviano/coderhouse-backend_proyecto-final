require('dotenv').config()

const config = {
  port: process.env.PORT || 8080,
  database: {
    mongo: {
      url: process.env.NODE_ENV === 'production' ? process.env.MONGO_URL_PROD : process.env.MONGO_URL_DEV
    }
  },
  session: {
    expirationTime: process.env.SESSION_EXPIRATION_TIME || '2h'
  },
  mailer: {
    user: process.env.GMAIL_APP_ACCOUNT,
    password: process.env.GMAIL_APP_PASSWORD
  },
  admin: {
    email: process.env.ADMIN_EMAIL,
    phone: process.env.ADMIN_PHONE
  }
}

module.exports = Object.freeze(config)