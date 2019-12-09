const db = require('../../../model/db')
const sql = require('../../../model/sql/appSQL')
const crypto = require('crypto')
const config = require('../../../model/config')
const JWT = require('jsonwebtoken')

const fav = {
    async addOrDelFav(ctx) {
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
            let userId = data['user_id']
            let sqls = ''
            ctx.request.body.userId = userId
            if (!ctx.request.body.status) {
                ctx.body = JSON.stringify({ code: 500, msg: '参数错误' })
                return
            }
            if (ctx.request.body.status === 1) {
                sqls = sql.addFav(ctx.request.body)
            } else {
                sqls = sql.deleteFav(ctx.request.body)
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

module.exports = fav
