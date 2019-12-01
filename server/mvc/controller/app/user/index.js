const db = require('../../../model/db')
const sql = require('../../../model/sql/appSQL')
const crypto = require('crypto')
const config = require('../../../model/config')
const JWT = require('jsonwebtoken')

// JWT.sign(info, secret, options) // 加密
// JWT.verify(token,secret,callback) // 解密

/**
 * code: 11000 用户已经存在
 * code: 11001 账号或密码错误 
 */
const user = {
    async register(ctx) {
        // 查询用户名是否已经注册
        let sqled = sql.login(ctx.request.body)
        let dbDataed = await db.query(sqled).catch(err => {
            ctx.body = JSON.stringify({ code: 500, msg: err })
        })
        if (dbDataed.length) {
            ctx.body = JSON.stringify({ code: 11000, msg: '该用户名已经被注册' })
            return
        }

        // 注册用户
        ctx.request.body.userHash = crypto.createHash('md5').update(ctx.request.body.password).digest('hex')
        let sqls = sql.register(ctx.request.body)
        let dbData = await db.query(sqls).catch(err => {
            ctx.body = JSON.stringify({ code: 500, msg: err })
        })

        if (dbData) {
            let { iss, sub, aud, jti } = config
            let token = JWT.sign({ iss, sub, aud, jti }, config.secret, { expiresIn: config.expiresIn })
            ctx.body = JSON.stringify({ code: 200, msg: '注册成功', token })
        }
    },

    async login(ctx) {
        let sqls = sql.login(ctx.request.body)
        let dbData = await db.query(sqls).catch(err => {
            ctx.body = JSON.stringify({ code: 500, msg: err })
        })

        let userHash = crypto.createHash('md5').update(ctx.request.body.password).digest('hex')

        if (dbData[0]['user_hash'] === userHash) {
            let { iss, sub, aud, jti } = config
            let token = JWT.sign({ iss, sub, aud, jti }, config.secret, { expiresIn: config.expiresIn })
            ctx.body = JSON.stringify({ code: 200, msg: '登录成功', token })
            return
        }
        ctx.body = JSON.stringify({ code: 11001, msg: '账户名或密码错误' })
    },

    async testToken(ctx) {
        let token = ctx.request.header.authorization
        JWT.verify(token, config.secret, (err,data)=>{
            if (err) {
                ctx.body = JSON.stringify({ code: 11001, msg: '登录超时', data: err })
                return
            }
            ctx.body = JSON.stringify({ code: 200, msg: 'success' })
        })
    }
}

module.exports = user