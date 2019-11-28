const db = require('../../../model/db')
const sql = require('../../../model/sql/adminSQL')

const discount = {
    async addDiscount(ctx) {
        let sqls = sql.addDiscount(ctx.request.body)
        let dbData = await db.query(sqls).catch(err => {
            ctx.body = JSON.stringify({ code: 500, msg: err })
        })

        let sqlsId = sql.getDiscountId()
        let dbDataId = await db.query(sqlsId).catch(err => {
            ctx.body = JSON.stringify({ code: 500, msg: err })
        })

        if (dbData && dbDataId) {
            ctx.body = JSON.stringify({ code: 200, msg: 'success', data: { ...ctx.request.body, discountId: dbDataId[0]['discount_id'] } })
        }
    },

    async deleteDiscount(ctx) {
        let sqls = sql.deleteDiscount(ctx.request.query)
        let dbData = await db.query(sqls).catch(err => {
            ctx.body = JSON.stringify({ code: 500, msg: err })
        })
        if (dbData) {
            ctx.body = JSON.stringify({ code: 200, msg: 'success' })
        }
    },

    /* 修改折扣商品信息 */
    async updateDiscount(ctx) {
        let sqls = sql.updateDiscount(ctx.request.body)
        let dbData = await db.query(sqls).catch(err => {
            ctx.body = JSON.stringify({ code: 500, msg: err })
        })
        if (dbData) {
            ctx.body = JSON.stringify({ code: 200, msg: 'success' })
        }
    },
}

module.exports = discount