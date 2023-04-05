"use strict";

// init model
const { User } = require("../Model/User");

// init class
class userController {
  // register
  static async RegisterController(req, res) {
    try {
      const { username, no_telp, email, password } = req.body;

      // Create a new user
      const userId = await User.RegisterModel(
        username,
        no_telp,
        email,
        password
      );

      res.status(200).json({
        message: userId,
      });
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  }

  // login
  static async LoginController(req, res, next) {
    const { email, password } = req.body;

    try {
      const result = await User.LoginModel(email, password);
      console.log(result)
      if (result.token && result.valid) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
      next()
    } catch (err) {
      console.log(err)
      res.status(401).json({
        message: err,
      });
    }
  }

  // checkuser
  static async CheckUser(req, res) {
    const { email } = req.body;

    try {
      const result = await User.FindUserByEmail(email);

      if(result) {
        res.status(200).json({
          message: "user found",
          user: true,
        });
      }
    } catch (err) {
      res.status(400).json({
        message: err,
        user: false,
      });
    }
  }

  // show profile
  static async ShowProfileController(req, res) {
    const { userId } = req;

    try {
      const result = await User.ShowProfileModel(+userId);

      res.status(200).json({ message: result });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }

  // show customers
  static async ShowUsersController(req, res) {
    try {
      const result = await User.ShowUsersModel();
      if (result) {
        res.status(200).json({ message: result });
      }
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }

  // search users
  static async SearchUsersController(req, res) {
    const nama_user = req.query.nama_user;

    try {
      const result = await User.SearchUserModel(nama_user);

      if (result) {
        res.status(200).json({ message: result });
      }
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }
}

module.exports = { userController };
