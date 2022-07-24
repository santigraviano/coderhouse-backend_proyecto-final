const router = require('express').Router()
const controller = require('../controllers/CartController')

router.get('/:id', controller.show)
router.post('/:id/items', controller.storeItem)
router.put('/:id/items', controller.updateItem)
router.delete('/:id/items', controller.destroyItem)
router.put('/:id/empty', controller.emptyItems)

module.exports = router