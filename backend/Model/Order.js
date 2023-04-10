"use stric";

// init db
const { db, connectSql } = require("../Config/db");

class TransactionModel {
  constructor(
    id_transaksi,
    id_costumer,
    id_product,
    tanggal_transaksi,
    alamat,
    jumlah_product,
    total_harga,
    Catatan,
    nama_gambar,
    url_gambar,
    status_transaksi,
    username,
  ) {
    this.id_transaksi = id_transaksi;
    this.id_costumer = id_costumer;
    this.id_product = id_product;
    this.tanggal_transaksi = tanggal_transaksi;
    this.alamat = alamat;
    this.jumlah_product = jumlah_product;
    this.total_harga = total_harga;
    this.Catatan = Catatan;
    this.nama_gambar = nama_gambar;
    this.url_gambar = url_gambar;
    this.status_transaksi = status_transaksi;
    this.username = username;
  }

  // tampilkan semua transaction
  static async ShowAllTransactionModel() {
    const sqlQuery =
      "SELECT transaksi.id_transaksi, transaksi.id_costumer, transaksi.id_product, transaksi.tanggal_transaksi, costumer.alamat, transaksi.jumlah_product, transaksi.total_harga, transaksi.catatan, produk.nama_gambar, produk.url_gambar, transaksi.status_transaksi, costumer.username FROM transaksi INNER JOIN produk ON transaksi.id_product = produk.id_product INNER JOIN costumer ON transaksi.id_costumer = costumer.id_costumer";

    try {
      const response = await connectSql(sqlQuery);
      let datas = [];
      let data;

      response.forEach((i) => {
        data = new TransactionModel(
          i.id_transaksi,
          i.id_costumer,
          i.id_product,
          i.tanggal_transaksi,
          i.jumlah_product,
          i.total_harga,
          i.Catatan,
          i.nama_gambar,
          i.url_gambar,
          i.status_transaksi,
          i.username
        );
        datas.push(data);
      });

      return datas;
    } catch (err) {
      throw new Error(err);
    }
  }

  // show detail transaction
  static async ShowTransationByIdModel(id) {
    const sqlQuery =
      "SELECT transaksi.id_transaksi, transaksi.id_costumer, transaksi.id_product, transaksi.tanggal_transaksi, costumer.alamat, transaksi.jumlah_product, transaksi.total_harga, transaksi.catatan, produk.nama_gambar, produk.url_gambar, transaksi.status_transaksi costumer.username FROM transaksi INNER JOIN produk ON transaksi.id_product = produk.id_product INNER JOIN person ON transaksi.id_costumer = person.id WHERE transaksi.id_transaksi = ?";

    try {
      const response = await connectSql(sqlQuery, [id]);
      const data = response[0];
      let dataById;
      if (data) {
        dataById = new TransactionModel(
          data.id_transaksi,
          data.id_costumer,
          data.id_product,
          data.tanggal_transaksi,
          data.jumlah_product,
          data.total_harga,
          data.Catatan,
          data.nama_gambar,
          data.url_gambar,
          data.status_transaksi,
          data.username 
        );
      }
      return dataById;
    } catch (err) {
      throw new Error(err);
    }
  }

  // update status
  static async UpdateStatusTransactionModel(status, id_transaksi) {
    const sqlQuery = "UPDATE transaksi SET status = ? WHERE id_transaksi = ?";

    try {
      const response = await connectSql(sqlQuery, [status, id_transaksi]);

      if (response) {
        return "barang sudah sampai tujuan";
      }
    } catch (err) {
      console.log(err);
    }
  }

  // tampilkan transaction berdasarkan status
  static async ShowAllTransactionProgressModel(status) {
    const sqlQuery =
      "SELECT transaksi.id_transaksi, transaksi.id_costumer, transaksi.id_product, transaksi.tanggal_transaksi, costumer.alamat, transaksi.jumlah_product, transaksi.total_harga, transaksi.catatan, produk.nama_gambar, produk.url_gambar, transaksi.status_transaksi costumer.username FROM transaksi INNER JOIN produk ON transaksi.id_product = produk.id_product INNER JOIN person ON transaksi.id_costumer = person.id WHERE transaksi.status = ?";

    console.log(sqlQuery);

    try {
      const response = await connectSql(sqlQuery, [status]);
      let datas = [];
      let data;

      response.forEach((i) => {
        data = new TransactionModel(
          i.id_transaksi,
          i.id_costumer,
          i.id_product,
          i.tanggal_transaksi,
          i.jumlah_product,
          i.total_harga,
          i.Catatan,
          i.nama_gambar,
          i.url_gambar,
          i.status_transaksi,
          i.username
        );
        datas.push(data);
      });

      return datas;
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = { TransactionModel };
