"use strict";

const express = require("express");
const orderRouter = express.Router();

// init auth
const { auth } = require("../Middleware/Auth");

// init controller
const {
  TransactionController,
} = require("../Controller/OrderController");

// endpoint router

// menampilkan data
orderRouter.get("/order", auth ,TransactionController.ShowAllTransactionsController);

// detail transaksi
orderRouter.get("/order/:id", auth, TransactionController.ShowTransationByIdController);

// membuat pesanan
orderRouter.put("/order/:id", auth, TransactionController.UpdateStatusTransactionController)

module.exports = { orderRouter };