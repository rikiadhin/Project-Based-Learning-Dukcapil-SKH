const router = require('express').Router() 
const { getAllKelurahan, getKelurahanById, createKelurahan, UpdateKelurahan, DeleteKelurahan, getKelurahanByIdKecamatan } = require('../controllers/KelurahanController');

router.get('/kelurahans', getAllKelurahan);
router.get('/kelurahan/:id', getKelurahanById);
router.get('/kelurahanByKecamatan/:idKec', getKelurahanByIdKecamatan);
router.post('/kelurahan', createKelurahan);
router.patch('/kelurahan/:id', UpdateKelurahan);
router.delete('/kelurahan/:id', DeleteKelurahan); 

module.exports = router
