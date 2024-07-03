const router = require('express').Router()
const { getAllKebutuhanKhusus, createKebutuhanKhusus, UpdateKebutuhanKhusus, DeleteKebutuhanKhusus, getKebutuhanKhususById } = require('../controllers/kebutuhanKhususController');  

router.get('/keb-khusus', getAllKebutuhanKhusus);
router.get('/keb-khusus/:id', getKebutuhanKhususById);
router.post('/keb-khusus', createKebutuhanKhusus);
router.patch('/keb-khusus/:id', UpdateKebutuhanKhusus);
router.delete('/keb-khusus/:id', DeleteKebutuhanKhusus);

module.exports = router
