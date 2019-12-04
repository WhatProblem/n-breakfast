const db = require('../../../model/db')
const sql = require('../../../model/sql/appSQL')
const crypto = require('crypto')
const config = require('../../../model/config')
const JWT = require('jsonwebtoken')

const goods = {
    /* 查询商品详情 */
    async goodsDetail(ctx) {
        let token = ctx.request.header.authorization
        await JWT.verify(token, config.secret, async (err, data) => {
            let sqls = ''
            if (err) {
                // 未登录
                sqls = sql.goodsDetail(ctx.request.query, false)
            } else {
                ctx.request.query.userId = data['user_id']
                sqls = sql.goodsDetail(ctx.request.query, true)
            }
            let dbData = await db.query(sqls).catch(err => {
                ctx.body = JSON.stringify({ code: 500, msg: err })
            })

            if (dbData) {
                ctx.body = JSON.stringify({ code: 200, msg: 'success', data: dbData[0] })
            }
        })
    },

    /* 查询商品 */
    async searchFor(ctx) {
        let sqls = sql.searchFor(ctx.request.query)
        let dbData = await db.query(sqls).catch(err => {
            ctx.body = JSON.stringify({ code: 500, msg: err })
        })

        if (dbData) {
            ctx.body = JSON.stringify({ code: 200, msg: 'success', data: dbData })
        }
    },

    async getHotSale(ctx) {
        let sqls = sql.getHotSale()
        let dbData = await db.query(sqls).catch(err => {
            ctx.body = JSON.stringify({ code: 500, msg: err })
        })

        if (dbData) {
            ctx.body = JSON.stringify({ code: 200, msg: 'success', data: dbData })
        }
    },

    async getHistory(ctx) {
        let sqls = sql.getHistory()
        let dbData = await db.query(sqls).catch(err => {
            ctx.body = JSON.stringify({ code: 500, msg: err })
        })

        if (dbData) {
            ctx.body = JSON.stringify({ code: 200, msg: 'success', data: dbData })
        }
    }
}

module.exports = goods