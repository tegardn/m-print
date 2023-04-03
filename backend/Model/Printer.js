"use strict";

// init database
const { db, connectSql } = require("../Config/db");

class Printer {
  constructor(id_produk, nama_produk, harga_produk, stok, deskripsi, gambar, url_gambar) {
    this.id_produk = id_produk;
    this.nama_produk = nama_produk;
    this.harga_produk = harga_produk;
    this.stok = stok;
    this.deskripsi = deskripsi;
    this.gambar = gambar;
    this.url_gambar = url_gambar;
  }

  // Get all products
  static async GetProductsModel() {
    const sqlQuery = "SELECT * FROM printer";

    try {
      const response = await connectSql(sqlQuery);
      let datas = [];
      let data;

      response.forEach((i) => {
        data = new Printer(
          i.id_produk,
          i.nama_produk,
          i.harga_produk,
          i.stok,
          i.deskripsi,
          i.gambar,
          i.url_gambar
        );
        datas.push(data);
      });

      return datas;
    } catch (err) {
      throw new Error(err);
    }
  }

  // Get products by id
  static async GetProductsByIdModel(id_produk) {
    const sqlQuery = "SELECT * FROM printer WHERE id_produk = ?";
    try {
      const response = await connectSql(sqlQuery, [id_produk]);
      const data = response[0];
      let dataById;
      if (data) {
        dataById = new Printer(
          data.id_produk,
          data.nama_produk,
          data.harga_produk,
          data.stok,
          data.deskripsi,
          data.gambar,
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
    nama_produk,
    harga_produk,
    stok,
    deskripsi,
    gambar,
    url_gambar
  ) {
    const querySql =
      "INSERT INTO printer(nama_produk, harga_produk, stok, deskripsi,gambar,url_gambar) VALUES(?,?,?,?,?,?)";

    try {
      const createProduct = await connectSql(querySql, [
        nama_produk,
        harga_produk,
        stok,
        deskripsi,
        gambar,
        url_gambar
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
    nama_produk,
    harga_produk,
    stok,
    deskripsi,
    gambar,
    url_gambar,
    id_produk,
  ) {
    const querySql =
      "UPDATE printer SET nama_produk = ?, harga_produk = ?, stok = ?, deskripsi = ?, gambar = ?, url_gambar = ? WHERE id_produk = ?";

    try {
      const updateProduct = await connectSql(querySql, [
        nama_produk,
        harga_produk,
        stok,
        deskripsi,
        gambar,
        url_gambar,
        id_produk,
      ]);

      if (updateProduct) {
        return "Product updated";
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  // delete product
  static async DeleteProductModel(id_produk) {
    const querySql = "DELETE FROM printer WHERE id_produk = ?";

    try {
      const deleteProduct = await connectSql(querySql, [id_produk]);

      if (deleteProduct) {
        return "Product deleted";
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  static async SearchProductModel(query) {
    const sqlQuery = `SELECT * FROM printer WHERE nama_produk LIKE '%${query}%'`;

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
