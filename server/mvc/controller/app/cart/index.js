const db = require('../../../model/db')
const sql = require('../../../model/sql/appSQL')
const crypto = require('crypto')
const config = require('../../../model/config')
const JWT = require('jsonwebtoken')

const cart = {
    async addOrDelCart(ctx) {
        let token = ctx.request.header.authorization
        if (!token) {
            ctx.body = JSON.stringify({ code: 11001, msg: '请先登录' })
            return
        }
        await JWT.verify(token, config.secret, async (err, data) => {
            if (err) {
                ctx.body = JSON.stringify({ code: 11001, msg: '登录超时', data: err })
                return
            }
            let sqls = ''
            ctx.request.body.userId = data['user_id']
            if (!ctx.request.body.status) {
                ctx.body = JSON.stringify({ code: 500, msg: '参数错误' })
                return
            }
            if (ctx.request.body.status === 1) {
                let sqlQuery = sql.getCart(ctx.request.body)
                let resQuery = await db.query(sqlQuery).catch(err => {
                    ctx.body = JSON.stringify({ code: 500, msg: err })
                })
                console.log(resQuery)
                if (!resQuery) return
                if (resQuery.length>0) {
                    sqls = sql.updateCart(ctx.request.body)
                } else {
                    sqls = sql.addCart(ctx.request.body)
                }
            } else if (ctx.request.body.status === 2) {
                sqls = sql.deleteCart(ctx.request.body)
            } else {
                sqls = sql.clearCart(ctx.request.body)
            }

            let dbData = await db.query(sqls).catch(err => {
                ctx.body = JSON.stringify({ code: 500, msg: err })
            })

            if (dbData) {
                ctx.body = JSON.stringify({ code: 200, msg: 'success' })
            }
        })
    }
}

module.exports = cart