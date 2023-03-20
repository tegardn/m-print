"use strict";

// init byrypt
const bcrypt = require("bcrypt");

const hashPass = (textPass) => {
  try {
    const salt = process.env.SALT;
    const hashedPass = bcrypt.hash(textPass, +salt);
    return hashedPass;
  } catch (err) {
    throw new Error(`Error in hashPassword: ${err}`);
  }
};

const verifyPass = (submittedPass, dbPass) => {
  try {
    const match = bcrypt.compare(submittedPass, dbPass);
    
    return match;
  } catch (err) {
    throw new Error(`Error in comparing key: ${err}`);
  }
};

module.exports = { hashPass, verifyPass };