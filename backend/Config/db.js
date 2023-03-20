'use strict'

// init mysql
const mysql = require('mysql');
const dbConfig = require('./dbConfig');

// connect mysql
const db = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
})

db.connect(err => {
    if (err) {
        console.error(err);
    } else {
        console.log('database connected')
    }
});

const connectSql = (sql, params) => {
    return new Promise((resolve, reject) => {
        db.query(sql, params, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
}

module.exports = { db, connectSql };