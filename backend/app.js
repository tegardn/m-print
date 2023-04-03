'use strict'

// dotenv
require('dotenv').config();

// inisiasi express
const express = require('express');
const app = express();

// init other modules
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

// init router
const { router } = require('./Router/Router');

// init port
const port = process.env.PORT || 3000;

// cors option
let originOptionsCors = {
    origin: `http://localhost:${port}`
};

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload());
app.use('/uploads', express.static("uploads"));
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// routing
app.use('/', router)


// port connection
app.listen(port, () => `koneksi port ${port}`);