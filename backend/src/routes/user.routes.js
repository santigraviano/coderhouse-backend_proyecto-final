const router = require('express').Router()
const controller = require('../controllers/UserController')
const auth = require('../middlewares/auth')

router.get('/', controller.index)
router.get('/:id', controller.show)
router.post('/', controller.store)
router.put('/:id', controller.update)
router.delete('/:id', controller.destroy)

module.exports = router