'use strict'

// init express
const express = require('express');
const printerRouter = express.Router();

// init controller
const { PrinterController } = require('../Controller/PrinterController');

// init auth
const { auth } = require('../Middleware/Auth');

// endpoint printer router

// menampilkan produk
printerRouter.get('/products', auth ,PrinterController.GetProductsController);

// menampilkan produk berdasarkan id
printerRouter.get('/product/:id', auth ,PrinterController.ShowProductByIdController);

// search produk
printerRouter.get('/search', PrinterController.SearchProductController)

// menambahkan produk
printerRouter.post('/product/add', auth ,PrinterController.AddProductController)

// update produk
printerRouter.patch('/product/update/:id', auth ,PrinterController.UpdateProductController)

//hapus produk
printerRouter.delete('/product/del/:id', auth ,PrinterController.DeleteProductController);

module.exports = { printerRouter };