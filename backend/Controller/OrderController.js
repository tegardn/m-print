"use strict";

// init model
const { TransactionModel } = require("../Model/order");

class TransactionController {
  // show transaction
  static async ShowAllTransactionsController(req, res) {
    try {
      const result = await TransactionModel.ShowAllTransactionModel();

      if (result) {
        res.status(200).json({ message: result });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // show detail transaction
  static async ShowTransationByIdController(req,res) {
    const { id_transaksi } = req.params;

    try {
      const result = await TransactionModel.ShowTransationByIdModel(+id_transaksi);

      if (result) {
        res.status(200).json({ message: result });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // show all transaction by progress
  static async ShowTransactionByProgressController(req, res) {
    try {
      const result = await TransactionModel.ShowAllTransactionProgressModel('progress');

      if (result) {
        res.status(200).json({ message: result });
      }

    } catch (err) {
      res.status(500).json({ message: err });
    }
  }

  // update status
  static async UpdateStatusTransactionController(req, res) {
    const { id_transaksi } = req.params;
    const status = req.body.status;

    try {
      const result = await TransactionModel.UpdateStatusTransactionModel(
        status,
        +id_transaksi
      );

      if (result) {
        res.status(200).json({ message: result });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = { TransactionController };