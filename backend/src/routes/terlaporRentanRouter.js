const router = require('express').Router()
const { getAllTerlaporRentan, getTerlaporRentanById, createTerlaporRentan, UpdateTerlaporRentan, DeleteTerlaporRentan } = require('../controllers/terlaporRentanController');

router.get('/terlapor-rentans', getAllTerlaporRentan);
router.get('/terlapor-rentan/:id', getTerlaporRentanById);
router.post('/terlapor-rentan', createTerlaporRentan);
router.patch('/terlapor-rentan/:id', UpdateTerlaporRentan);
router.delete('/terlapor-rentan/:id', DeleteTerlaporRentan);

module.exports = router
