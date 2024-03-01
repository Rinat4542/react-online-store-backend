const Router = require('express');
const router = new Router()
const DeviceController = require('../controllers/deviceController')

router.get('/', DeviceController.getAll)//получить все 
router.get('/:id', DeviceController.getOne)//получить конкретный девайс
router.post('/', DeviceController.create)//создать



module.exports = router