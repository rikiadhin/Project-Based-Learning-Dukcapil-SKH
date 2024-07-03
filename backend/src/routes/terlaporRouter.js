const router = require('express').Router()
const { getAllTerlapor, getTerlaporById, createTerlapor, UpdateTerlapor, DeleteTerlapor } = require('../controllers/terlaporController');
const { middleware } = require('../middlewares/middlewareJwtToken')

router.get('/terlapors', middleware, getAllTerlapor);
router.get('/terlapor/:id', middleware, getTerlaporById);
router.post('/terlapor', createTerlapor);
router.patch('/terlapor/:id', UpdateTerlapor);
router.delete('/terlapor/:id', DeleteTerlapor);

module.exports = router
