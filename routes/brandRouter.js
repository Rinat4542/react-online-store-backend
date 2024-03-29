const Router = require('express');
const router = new Router()
const BrandController = require('../controllers/brandController')

router.get('/', BrandController.getAll)
router.post('/', BrandController.create)


module.exports = router