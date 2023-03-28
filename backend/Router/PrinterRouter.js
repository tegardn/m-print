'use strict'

// init express
const express = require('express');
const printerRouter = express.Router();

// init controller
const { PrinterController } = require('../Controller/PrinterController');

// endpoint printer router

// menampilkan produk
printerRouter.get('/products', PrinterController.GetProductsController);

// menampilkan produk berdasarkan id
printerRouter.get('/product/:id', PrinterController.ShowProductByIdController);

// search produk
printerRouter.get('/search', PrinterController.SearchProductController)

// menambahkan produk
printerRouter.post('/product/add', PrinterController.AddProductController)

// update produk
printerRouter.patch('/product/update/:id', PrinterController.UpdateProductController)

//hapus produk
printerRouter.delete('/product/del/:id', PrinterController.DeleteProductController);

module.exports = { printerRouter };