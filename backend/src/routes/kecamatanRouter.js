const router = require('express').Router()
const { getAllKecamatan, getKecamatanById, createKecamatan, UpdateKecamatan, DeleteKecamatan } = require('../controllers/kecamatanController');

router.get('/kecamatans', getAllKecamatan);
router.get('/kecamatan/:id', getKecamatanById);
router.post('/kecamatan', createKecamatan);
router.patch('/kecamatan/:id', UpdateKecamatan);
router.delete('/kecamatan/:id', DeleteKecamatan);

module.exports = router
