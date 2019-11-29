const db = require('../../../model/db')
const sql = require('../../../model/sql/appSQL')

const banner = {
    /* 查询banner列表 */
    async getBannerList(ctx) {
        let sqls = sql.getBannerList()
        let dbData = await db.query(sqls).catch(err => {
            ctx.body = JSON.stringify({ code: 500, msg: err })
        })

        if (dbData) {
            ctx.body = JSON.stringify({ code: 200, msg: 'success', data: dbData })
        }
    }
}

module.exports = banner