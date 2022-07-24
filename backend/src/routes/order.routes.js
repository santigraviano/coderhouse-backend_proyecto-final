const router = require('express').Router()
const controller = require('../controllers/OrderController')

router.post('/', controller.store)

module.exports = router