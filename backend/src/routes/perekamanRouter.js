const router = require('express').Router()
const { getAllPerekaman, getPerekamanById, createPerekaman, UpdatePerekaman, DeletePerekaman } = require('../controllers/perekamanController');

router.get('/perekamans', getAllPerekaman);
router.get('/perekaman/:id', getPerekamanById);
router.post('/perekaman', createPerekaman);
router.patch('/perekaman/:id', UpdatePerekaman);
router.delete('/perekaman/:id', DeletePerekaman);

module.exports = router
