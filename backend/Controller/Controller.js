'use strict'

// init model
const { Model } = require('../Model/Model');

// controller class
class Controller {
    // homepage
    static Homepage(req, res) {
        // init response
        const response = Model.LandingModel();

        // check response
        if (response instanceof Error) {
            res.json({
                message: response.message,
            })
        } else {
            res.json({
                message: response,
            })
        }
    }
}

module.exports = { Controller };