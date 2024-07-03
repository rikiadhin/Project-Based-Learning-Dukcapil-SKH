const router = require('express').Router()
const { getAllPelaporan, createPelaporan, getPelaporanById, UpdatePelaporan, DeletePelaporan } = require('../controllers/PelaporanController.js')

router.get('/pelaporans', getAllPelaporan);
router.get('/pelaporan/:id', getPelaporanById);
router.post('/pelaporan', createPelaporan);
router.patch('/pelaporan/:id', UpdatePelaporan);
router.delete('/pelaporan/:id', DeletePelaporan);

module.exports = router

