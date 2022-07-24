require('dotenv').config()
const path = require('path')
const express = require('express')
const cors = require('cors')
const { engine } = require('express-handlebars')
const { createServer } = require('http')
const io = require('./services/socketio')
const errorHandler = require('./middlewares/errors')
const productRouter = require('./routes/product.routes')
const messageRouter = require('./routes/message.routes')
const cartRouter = require('./routes/cart.routes')
const userRouter = require('./routes/user.routes')
const authRouter = require('./routes/auth.routes')
const orderRouter = require('./routes/order.routes')
const generalRouter = require('./routes/general.routes')

const app = express()

// Set handlebars view engine
app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('views', path.join(__dirname, '/views'))

app.use(express.static(path.join(__dirname, '/public')))

app.use(express.json())
app.use(cors({
  origin: 'http://localhost:8000',
  optionsSuccessStatus: 200
}))

app.use('/', generalRouter)

// API routes
app.use('/api/products', productRouter)
app.use('/api/messages', messageRouter)
app.use('/api/orders', orderRouter)
app.use('/api/carts', cartRouter)
app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)

const pug = require('pug')

app.get('/email', (req, res) => {
  const render = pug.compileFile(path.join(__dirname, '/views/email/newuser.pug'))

  const html = render({ firstName: 'Santiago', lastName: 'Graviano', email: 'santiago.graviano@gmail.com', phone: '1234234' })

  res.send(html)
})

// Error handle middleware
app.use(errorHandler)

// Connect server with socket.io
const server = createServer(app)
io.connect(server)

module.exports = server