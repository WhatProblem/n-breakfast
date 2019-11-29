const db = require('../../../model/db')
const sql = require('../../../model/sql/appSQL')

const discount = {
    /* 查询discount列表 */
    async getDiscountList(ctx) {
        let sqls = sql.getDiscountList()
        let dbData = await db.query(sqls).catch(err => {
            ctx.body = JSON.stringify({ code: 500, msg: err })
        })

        if (dbData) {
            ctx.body = JSON.stringify({ code: 200, msg: 'success', data: dbData })
        }
    }
}

module.exports = discount