'use strict'

// init express
const express = require('express');
const router = express.Router();

// init other router
const { userRouter } = require('./UserRouter');

// init controller
const { Controller } = require('../Controller/Controller');

// test get
router.get('/', Controller.Homepage)
router.use(userRouter)

module.exports = { router };