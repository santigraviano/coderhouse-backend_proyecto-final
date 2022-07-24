const router = require('express').Router()
const controller = require('../controllers/MessageController')

router.get('/', controller.index)
router.get('/:id', controller.show)
router.post('/', controller.store)
router.put('/:id', controller.update)
router.delete('/:id', controller.destroy)

module.exports = router