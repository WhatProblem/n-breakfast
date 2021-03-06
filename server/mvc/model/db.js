const Koa = require('koa')
const mysql = require('koa-mysql')
const config = require('./config')
const app = new Koa()
const pool = mysql.createPool({ user: config.user, password: config.password, host: config.host, port: config.port, database: config.database })

const query = (sql) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err)
            } else {
                // connection.query(sql, val, (err, fields) => {
                connection.query(sql, (err, fields) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(fields)
                    }
                    connection.release()
                })
            }
        })
    })
}

module.exports = { query }