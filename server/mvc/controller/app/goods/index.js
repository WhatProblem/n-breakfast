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
                console.log(123)
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
    }
}

module.exports = goods