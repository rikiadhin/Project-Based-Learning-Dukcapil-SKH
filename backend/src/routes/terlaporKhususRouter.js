const router = require('express').Router()
const { getAllTerlaporKhusus, getTerlaporKhususById, createTerlaporKhusus, UpdateTerlaporKhusus, DeleteTerlaporKhusus } = require('../controllers/terlaporKhususController');

router.get('/terlapor-khusus', getAllTerlaporKhusus);
router.get('/terlapor-khusus/:id', getTerlaporKhususById);
router.post('/terlapor-khusus', createTerlaporKhusus);
router.patch('/terlapor-khusus/:id', UpdateTerlaporKhusus);
router.delete('/terlapor-khusus/:id', DeleteTerlaporKhusus);

module.exports = router
