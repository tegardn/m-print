"use strict";

// init database
const {db, connectSql } = require("../Config/db");

// init jwt
const { hashPass, verifyPass } = require("../Helper/ConvertPass");
const jwt = require("jsonwebtoken");

class User {
  constructor( username, no_telp, email, password) {
    this.username = username;
    this.no_telp = no_telp;
    this.email = email;
    this.password = password;
  }

  // registermodel
  static async RegisterModel(username, no_telp, email, password) {
    //query sql
    const sqlQuery = "INSERT INTO admin (username, no_telp, email, password) VALUES (?, ?, ?, ?)";

    try {
      const hasher = await hashPass(password);

      // Execute an SQL query to insert the user into the database
      const user = await connectSql(sqlQuery, [username, no_telp, email, hasher]);

      if (user) {
        return 'user created';
      };
    } catch (err) {
      console.error(err);
      throw new Error("Unable to create user");
    }
  }

  // loginmodel
  static async LoginModel(email, password) {
    try {
      // find user
      const user = await this.FindUserByEmail(email);
      let hashedToken;

      if (user) {
        hashedToken = user.password;
        console.log(hashedToken);
        const valid = await verifyPass(password, hashedToken);

        if (!valid) {
          return {
            user: false,
            valid,
            token: null,
            message: "wrong password"
          }
        }

        if (valid) {
          const token = jwt.sign({ userId: user.id_admin }, process.env.JWT_SECRET);
          return {
            user: true,
            valid,
            token,
            message: "Login success"
          }
        }
      }
    } catch (err) {
      console.log(err)
      return err
    }
  }

  // find user by email
  static async FindUserByEmail(email) {
    let sqlQuery = 'SELECT * FROM admin WHERE email = ?';
    let resultUser;

    try {
      const user = await connectSql(sqlQuery, [email]);
      resultUser = user[0];
      return resultUser;
    } catch (err) {
      throw new Error(`Error in findUserByEmail: ${err}`);
    }
  }

  // show profile model
  static async ShowProfileModel(id) {
    let sqlQuery = 'SELECT * FROM admin WHERE id_admin = ?';
    let resultUser;


    try {
      const user = await connectSql(sqlQuery, [id]);
      const result = user[0];
      resultUser = new User(result.username, result.no_telp, result.email, result.password);

      console.log(resultUser);
      return resultUser;
    } catch (err) {
      throw new Error(`Error in findUserById: ${err}`);
    }

  }

  // search customers
  static async SearchUserModel(q) {
    let sqlQuery = `SELECT * FROM costumer WHERE username LIKE '%${q}%'`;

    try {
      const response = await connectSql(sqlQuery, [q]);

      if (response) {
        return response;
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  // show customers
  static async ShowUsersModel() {
    const sqlQuery = `SELECT * FROM costumer`;

    try {
      const response = await connectSql(sqlQuery);
      
      let datas = [];
      let data;

      response.forEach((i) => {
        data = new User(
          i.nama,
          i.email,
          i.password,
          i.no_telp,
          i.alamat,
        );

        datas.push(data);

      });

      return datas;

    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = { User };
