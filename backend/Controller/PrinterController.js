"use strict";

// init model
const { Printer } = require("../Model/Printer");

// init other module
const fs = require("fs");
const path = require("path");

class PrinterController {
  // show products
  static async GetProductsController(req, res) {
    try {
      const result = await Printer.GetProductsModel();
      if (result) {
        res.status(200).json({ message: result });
      }
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }

  // show products by id
  static async ShowProductByIdController(req, res) {
    const { id } = req.params;
    try {
      const result = await Printer.GetProductsByIdModel(+id);
      if (result) {
        res.status(200).json({ message: result });
      }
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }

  // add product
  static async AddProductController(req, res) {
    const { nama_product, harga_product, stock, description } = req.body;
    const gambar = req.files.gambar;
    const ext = path.extname(gambar.name);
    const fileGambar = gambar.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileGambar}`;

    gambar.mv(`./images/${fileGambar}`, async () => {
      try {
        const result = await Printer.AddProductModel(
          nama_product,
          harga_product,
          stock,
          description,
          fileGambar,
          url
        );

        if (result) {
          res.status(200).json({ message: result });
        }
      } catch (err) {
        res.status(500).json({ message: err });
      }
    });
  }

  // update product
  static async UpdateProductController(req, res) {
    const { id } = req.params;
    const product = await Printer.GetProductsByIdModel(+id);
    console.log(product.nama_gambar);

    if (!product) return res.status(404).json({ msg: "Data Tidak ditemukan" });

    let namaFile = "";
    if (req.files === null) {
      namaFile = Printer.gambar;
    } else {
      const gambar = req.files.gambar;
      const ext = path.extname(gambar.name);
      namaFile = gambar.md5 + ext;

      //change old file with new file
      const filepath = `./images/${product.nama_gambar}`;
      fs.unlinkSync(filepath);

      gambar.mv(`./images/${namaFile}`, (err) => {
        if (err) return res.status(500).json({ msg: err.message });
      });
    }
    
    const { nama_product, harga_product, stock, description } = req.body;
    const url = `${req.protocol}://${req.get("host")}/images/${namaFile}`;

    try {
      await Printer.UpdateProductModel(
        nama_product,
        harga_product,
        stock,
        description,
        namaFile,
        url,
        +id
      );
      res.status(200).json({ msg: "Produk Berhasil diperbaharui" });
    } catch (error) {
      console.log(error.message);
    }
  }

  // delete product
  static async DeleteProductController(req, res) {
    const { id } = req.params;
    const productResult = await Printer.GetProductsByIdModel(+id);
    console.log(productResult);

    try {
      const fileGambarUrl = `./images/${productResult.nama_gambar}`;
      fs.unlinkSync(fileGambarUrl);

      const result = await Printer.DeleteProductModel(+id);

      if (result) {
        res.status(200).json({ message: result });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // search
  static async SearchProductController(req, res) {
    const nama_product = req.query.nama_product;

    try {
      const result = await Printer.SearchProductModel(nama_product);

      if (result) {
        res.status(200).json({ message: result });
      }
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }
}

module.exports = { PrinterController };
