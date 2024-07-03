const router = require('express').Router()
const { getAllUser, getUserById, getUserByEmail, createUser, UpdateUser, ChangePassword, DeleteUser, fotgotPassword, ResetPassword } = require('../controllers/userController');
const {
	runValidation, changePassword
} = require("../middlewares/middlewareAuth");
const { middleware } = require('../middlewares/middlewareJwtToken')

router.get('/users', getAllUser);
router.get('/user/:id', getUserById);
router.get('/userByEmail/:email', getUserByEmail);
router.patch("/user/forgot-password", fotgotPassword);
router.post('/user', createUser);
router.patch('/user/:email1', middleware, UpdateUser);
router.patch('/user/change-password/:email', middleware, ChangePassword); 
router.patch('/user-reset-password', ResetPassword); 
router.delete('/user/:id', DeleteUser);

module.exports = router
