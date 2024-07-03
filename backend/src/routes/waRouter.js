// const express from "express";
// const { submitForm } from "../controllers/waController.js";
const express = require("express");
const submitForm  = require("../controllers/waController.js");

const router = express.Router();

// router.get('/users', getUsers);
// router.get('/users/:id', getUserById);
router.post('/users', submitForm);
// router.patch('/users/:id', updateUser);
// router.delete('/users/:id', deleteUser);
// http:/localhost:3000/users
module.exports = router;
