'use strict'

// dotenv
require('dotenv').config();

// inisiasi express
const express = require('express');
const app = express();

// init other modules
const cors = require('cors');
const bodyParser = require('body-parser');

// init router
const { router } = require('./Router/Router');

// init port
const port = process.env.PORT || 3000;

// cors option
let originOptionsCors = {
    origin: `http://localhost:${port}`
};

app.use(
    cors({
        origin : '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue : false,
        optionsSuccessStatus: 204,
    })
);
// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routing
app.use('/', router)

// port connection
app.listen(port, () => `koneksi port ${port}`);