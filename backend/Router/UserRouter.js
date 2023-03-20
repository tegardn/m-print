'use strict'

// init express
const express = require('express');
const userRouter = express.Router();

// init Controller
const { userController } = require('../Controller/UserController');

// init auth
const { auth } = require('../Middleware/Auth');

// endpoint userRouter

// register Router
userRouter.post('/register', userController.RegisterController);

// login Router
userRouter.post("/login", userController.LoginController);

// check user Router
userRouter.post("/check", userController.checkUser);

// show profiles
userRouter.get('/profile', auth, userController.ShowProfileController);

// export module
module.exports = { userRouter };