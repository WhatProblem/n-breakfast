const db = require('../../../model/db')
const sql = require('../../../model/sql/appSQL')

const sort = {
    /* 查询sort类别列表 */
    async getSortList(ctx) {
        let sqls = sql.getSortList()
        let dbData = await db.query(sqls).catch(err => {
            ctx.body = JSON.stringify({ code: 500, msg: err })
        })

        if (dbData) {
            ctx.body = JSON.stringify({ code: 200, msg: 'success', data: dbData })
        }
    },

    /* 查询类别下对应的商品列表 */
    async getSortGoodsList(ctx) {
        let sqls = sql.getSortGoodsList(ctx.request.query)
        let dbData = await db.query(sqls).catch(err => {
            ctx.body = JSON.stringify({ code: 500, msg: err })
        })

        // 查询总条数 
        let sqlTotal = sql.getSortGoodsTotal(ctx.request.query)
        let dbDataTotal = await db.query(sqlTotal).catch(err => {
            ctx.body = JSON.stringify({ code: 500, msg: err })
        })
        if (dbData && dbDataTotal) {
            ctx.body = JSON.stringify({ code: 200, msg: 'success', data: { list: dbData, total: dbDataTotal[0]['total'], pages: Math.ceil(dbDataTotal[0]['total'] / ctx.request.query.pageSize), currentPage: ctx.request.query.pageNum, pageNum: ctx.request.query.pageNum, pageSize: ctx.request.query.pageSize } })
        }
    }
}

module.exports = sort