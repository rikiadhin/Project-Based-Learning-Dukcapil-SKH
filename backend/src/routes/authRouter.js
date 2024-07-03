const router = require('express').Router()
const { loginUser, getUser } = require('../controllers/authController'); 
const { runValidation, loginValidation } = require('../middlewares/middlewareAuth')
const { middleware } = require('../middlewares/middlewareJwtToken')

// router.get('/Users', getAllUser);
// router.get('/User/:id', getUserById);
router.post('/user/login', loginValidation, runValidation, loginUser);
// router.patch('/User/:id', UpdateUser);
// router.delete('/User/:id', DeleteUser);
router.get('/sssssss', middleware, getUser)

module.exports = router
