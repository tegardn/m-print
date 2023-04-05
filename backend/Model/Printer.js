"use strict";

// init database
const { db, connectSql } = require("../Config/db");

class Printer {
  constructor(
    id_product,
    nama_product,
    harga_product,
    stock,
    deskripsi,
    gambar,
    url_gambar
  ) {
    this.id_product = id_product;
    this.nama_product = nama_product;
    this.harga_product = harga_product;
    this.stock = stock;
    this.description = deskripsi;
    this.nama_gambar = gambar;
    this.url_gambar = url_gambar;
  }

  // Get all products
  static async GetProductsModel() {
    const sqlQuery = "SELECT * FROM produk";

    try {
      const response = await connectSql(sqlQuery);
      let datas = [];
      let data;

      response.forEach((i) => {
        data = new Printer(
          i.id_product,
          i.nama_product,
          i.harga_product,
          i.stock,
          i.description,
          i.nama_gambar,
          i.url_gambar
        );
        datas.push(data);
      });
      console.log(datas);
      return datas;
    } catch (err) {
      throw new Error(err);
    }
  }

  // Get products by id
  static async GetProductsByIdModel(id) {
    const sqlQuery = "SELECT * FROM produk WHERE id_product = ?";
    try {
      const response = await connectSql(sqlQuery, [id]);
      const data = response[0];
      let dataById;
      if (data) {
        dataById = new Printer(
          data.id_product,
          data.nama_product,
          data.harga_product,
          data.stock,
          data.description,
          data.nama_gambar,
          data.url_gambar
        );
      }
      return dataById;
    } catch (err) {
      throw new Error(err);
    }
  }

  // add product
  static async AddProductModel(
    nama_product,
    harga_product,
    stock,
    description,
    nama_gambar,
    url_gambar
  ) {
    const querySql =
      "INSERT INTO produk(nama_product, harga_product, stock, description, nama_gambar, url_gambar) VALUES(?,?,?,?,?,?)";

    try {
      const createProduct = await connectSql(querySql, [
        nama_product,
        harga_product,
        stock,
        description,
        nama_gambar,
        url_gambar,
      ]);

      if (createProduct) {
        return "Product Created";
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  // update product
  static async UpdateProductModel(
    nama_product,
    harga_product,
    stock,
    description,
    nama_gambar,
    url_gambar,
    id_product
  ) {
    const querySql =
      "UPDATE produk SET nama_product = ?, harga_product = ?, stock = ?, description = ?, nama_gambar = ?, url_gambar = ? WHERE id_product = ?";

    try {
      const updateProduct = await connectSql(querySql, [
        nama_product,
        harga_product,
        stock,
        description,
        nama_gambar,
        url_gambar,
        id_product,
      ]);

      if (updateProduct) {
        return "Product updated";
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  // delete product
  static async DeleteProductModel(id_product) {
    const querySql = "DELETE FROM produk WHERE id_product = ?";

    try {
      const deleteProduct = await connectSql(querySql, [id_product]);

      if (deleteProduct) {
        return "Product deleted";
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  static async SearchProductModel(query) {
    const sqlQuery = `SELECT * FROM produk WHERE nama_product LIKE '%${query}%'`;

    try {
      const response = await connectSql(sqlQuery, [query]);

      if (response) {
        return response;
      }
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = { Printer };
