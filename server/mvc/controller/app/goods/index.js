const db = require('../../../model/db')
const sql = require('../../../model/sql/appSQL')

const goods = {
    /* 查询商品详情 */
    async goodsDetail(ctx) {
        let sqls = sql.goodsDetail(ctx.request.query.id)
        let dbData = await db.query(sqls).catch(err => {
            ctx.body = JSON.stringify({ code: 500, msg: err })
        })

        if (dbData) {
            ctx.body = JSON.stringify({ code: 200, msg: 'success', data: dbData[0] })
        }
    }
}

module.exports = goods