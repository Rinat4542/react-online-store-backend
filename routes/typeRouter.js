const Router = require('express');
const router = new Router()
const TypeController = require('../controllers/typeController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/', checkRole('ADMIN'), TypeController.getAll)
router.post('/', TypeController.create)


module.exports = router