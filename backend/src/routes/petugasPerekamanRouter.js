const router = require('express').Router()
const { getAllPetugasPerekaman, getPetugasPerekamanById, createPetugasPerekaman, UpdatePetugasPerekaman, DeletePetugasPerekaman } = require('../controllers/petugasPerekamanController.js');

router.get('/petugasPerekamans', getAllPetugasPerekaman);
router.get('/petugasPerekaman/:id', getPetugasPerekamanById);
router.post('/petugasPerekaman', createPetugasPerekaman);
router.patch('/petugasPerekaman/:id', UpdatePetugasPerekaman);
router.delete('/petugasPerekaman/:id', DeletePetugasPerekaman);

module.exports = router
