const router = require('express').Router()
const { getAllJenisKelamin, getJenisKelaminById, createJenisKelamin, UpdateJenisKelamin, DeleteJenisKelamin } = require('../controllers/jenisKelaminController');

router.get('/jenisKelamins', getAllJenisKelamin);
router.get('/jenisKelamin/:id', getJenisKelaminById);
router.post('/jenisKelamin', createJenisKelamin);
router.patch('/jenisKelamin/:id', UpdateJenisKelamin);
router.delete('/jenisKelamin/:id', DeleteJenisKelamin);

module.exports = router
