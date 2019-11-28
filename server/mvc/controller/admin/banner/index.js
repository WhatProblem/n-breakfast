const db = require('../../../model/db')
const sql = require('../../../model/sql/adminSQL')

const banner = {
    /* 新增轮播 */
    async addBanner(ctx) {
        let sqls = sql.addBanner(ctx.request.body)
        let dbData = await db.query(sqls).catch(err => {
            ctx.body = JSON.stringify({ code: 500, msg: err })
        })

        let sqlsId = sql.getBannerId()
        let dbDataId = await db.query(sqlsId).catch(err => {
            ctx.body = JSON.stringify({ code: 500, msg: err })
        })

        if (dbData && dbDataId) {
            ctx.body = JSON.stringify({ code: 200, msg: 'success', data: { id: ctx.request.body.id, bannerId: dbDataId[0]['banner_id'] } })
        }
    },

    /* 删除轮播 */
    async deleteBanner(ctx) {
        let sqls = sql.deleteBanner(ctx.request.query)
        let dbData = await db.query(sqls).catch(err => {
            ctx.body = JSON.stringify({ code: 500, msg: err })
        })
        if (dbData) {
            ctx.body = JSON.stringify({ code: 200, msg: 'success' })
        }
    }
}

module.exports = banner