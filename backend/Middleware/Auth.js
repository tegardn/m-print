"use strict";

const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const token = req.header("token-auth");

  //   const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(400).json({ message: "Invalid authorization" });
  }

  try {
    jwt.verify( token, process.env.JWT_KEY, (err, user) => {
        if (err) {
          return res.sendStatus(400);
        }
        
        req.user = user; 
      }
    );
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid authorization" });
  }
};

module.exports = { auth };
