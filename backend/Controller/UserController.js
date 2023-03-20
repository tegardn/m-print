"use strict";

// init model
const { User } = require("../Model/User");

// init class
class userController {
  // register
  static async RegisterController(req, res) {
    try {
      const { nama, email, password, no_hp, alamat, role } = req.body;
      const {created_at, updated_at} = "current_timestamp()"

      // Create a new user
      const userId = await User.RegisterModel(
        nama,
        email,
        password,
        no_hp,
        alamat,
        role,
        created_at,
        updated_at
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
  static async LoginController(req, res) {
    const { email, password } = req.body;

    try {
      const result = await User.LoginModel(email, password);

      if (result.token && result.valid) {
        res.header("token-auth", result.token).status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (err) {
      console.error(err);

      res.status(500).json({
        error: err, 
      });
    }
  }

  // checkuser
  static async checkUser(req, res) {
    const { email } = req.body;

    try {
      const result = await User.findUserByEmail(email);
      if (result) {
        res.status(200).json({
          message: "user found",
          User: true,
        });
      }
    } catch (err) {
      res.status(400).json({
        message: err,
        User: false,
      });
    }
  }

  // show profile
  static async ShowProfileController(req, res) {
    const userId = req.user.id;
    console.log(userId);

    try {
      const result = await User.ShowProfileModel(userId);

      res.status(200).json({ message: result });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }
}

module.exports = { userController };
