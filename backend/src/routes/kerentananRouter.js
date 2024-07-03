const router = require('express').Router() 
const { getAllKerentanan, getKerentananById, createKerentanan, UpdateKerentanan, DeleteKerentanan } = require('../controllers/kerentananController.js')

router.get('/kerentanans', getAllKerentanan);
router.get('/kerentanan/:id', getKerentananById);
router.post('/kerentanan', createKerentanan);
router.patch('/kerentanan/:id', UpdateKerentanan);
router.delete('/kerentanan/:id', DeleteKerentanan);

module.exports = router

     