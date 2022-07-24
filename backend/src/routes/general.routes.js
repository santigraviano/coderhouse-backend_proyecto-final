const router = require('express').Router()
const controller = require('../controllers/GeneralController')

router.get('/chat/response', controller.chatResponse)
router.get('/server-info', controller.serverInfo)
router.get('/config', controller.config)

module.exports = router