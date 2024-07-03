const router = require('express').Router()
const { getAllHubungan, getHubunganById, createHubungan, UpdateHubungan, DeleteHubungan } = require('../controllers/hubunganController');

router.get('/hubungans', getAllHubungan);
router.get('/hubungan/:id', getHubunganById);
router.post('/hubungan', createHubungan);
router.patch('/hubungan/:id', UpdateHubungan);
router.delete('/hubungan/:id', DeleteHubungan);

module.exports = router
