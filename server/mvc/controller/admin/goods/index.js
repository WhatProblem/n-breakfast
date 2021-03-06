const db = require('../../../model/db')
const sql = require('../../../model/sql/adminSQL')
const banner = require('../banner')
const discount = require('../discount')

const goods = {
    async getGoodsList(ctx) {
        ctx.body = JSON.stringify({ code: 200, data: { title: 'my ssr 接口获取', common: ctx.headers, list: [123, 123, 123, 123] } })
    },
    async getTest(ctx) {
        ctx.body = JSON.stringify({ code: 200, data: { title: 'my ssr', common: ctx.headers } })
    },
    async getHome(ctx) {
        ctx.body = JSON.stringify({ code: 200, data: { title: 'my home ssr' } })
    },
    async postData(ctx) {
        let sqls = sql.test()
        let dbData = await db.query(sqls);
        ctx.body = JSON.stringify({ code: 200, dbData: dbData, data: { title: 'my post ssr', common: ctx.headers, obj: ctx.request.body } })
    },


    /* 查看商品分类 */
    async getCategory(ctx) {
        let sqls = sql.getCategory()
        let dbData = await db.query(sqls).catch(err => {
            ctx.body = JSON.stringify({ code: 500, msg: err })
        })
        if (dbData) {
            ctx.body = JSON.stringify({ code: 200, msg: 'success', data: dbData })
        }
    },

    /* 新增商品分类 */
    async addCategory(ctx) {
        let sqls = sql.addCategory(ctx.request.body)
        let dbData = await db.query(sqls).catch(err => {
            ctx.body = JSON.stringify({ code: 500, msg: err })
        })

        let sqlsId = sql.getCategoryId()
        let dbDataId = await db.query(sqlsId).catch(err => {
            ctx.body = JSON.stringify({ code: 500, msg: err })
        })

        if (dbData && dbDataId) {
            ctx.body = JSON.stringify({ code: 200, msg: 'success', data: { sort_name: ctx.request.body.sortName, sort_icon: ctx.request.body.sortIcon, sort_id: dbDataId[0]['sortId'] } })
        }
    },

    /* 查看商品列表 */
    async getGoods(ctx) {
        let sqls = sql.getGoods(ctx.request.query)
        let dbData = await db.query(sqls).catch(err => {
            ctx.body = JSON.stringify({ code: 500, msg: err })
        })
        // 查询总条数 
        let sqlTotal = sql.getAll(ctx.request.query)
        let dbDataTotal = await db.query(sqlTotal).catch(err => {
            ctx.body = JSON.stringify({ code: 500, msg: err })
        })
        if (dbData && dbDataTotal) {
            ctx.body = JSON.stringify({ code: 200, msg: 'success', data: { list: dbData, total: dbDataTotal[0]['total'], pages: Math.ceil(dbDataTotal[0]['total'] / ctx.request.query.pageSize), currentPage: ctx.request.query.pageNum, pageNum: ctx.request.query.pageNum, pageSize: ctx.request.query.pageSize } })
        }
    },

    /* 新增商品 */
    async addGoods(ctx) {
        let sqls = sql.addGoods(ctx.request.body)
        let dbData = await db.query(sqls).catch(err => {
            ctx.body = JSON.stringify({ code: 500, msg: err })
        })

        let sqlsId = sql.getGoodsId()
        let dbDataId = await db.query(sqlsId).catch(err => {
            ctx.body = JSON.stringify({ code: 500, msg: err })
        })

        if (dbData && dbDataId) {
            // let resBanner = {}
            // if (ctx.request.body.isBanner) {
            //     ctx.request.body.id = dbDataId[0]['id']
            //     banner.addBanner(ctx)
            // }
            // if (ctx.request.body.isDiscount) {
            //     ctx.request.body.id = dbDataId[0]['id']
            //     discount.addDiscount(ctx)
            // }
            ctx.body = JSON.stringify({ code: 200, msg: 'success', data: { ...ctx.request.body, id: dbDataId[0]['id'] } })
        }
    },

    /* 修改商品信息 */
    async updateGoods(ctx) {
        let sqls = sql.updateGoods(ctx.request.body)
        let dbData = await db.query(sqls).catch(err => {
            ctx.body = JSON.stringify({ code: 500, msg: err })
        })
        // let resBanner = {}
        // let resDis = {}
        if (dbData) {
            // if (ctx.request.body.isBanner && !String(ctx.request.body.bannerId)) {
            //     resBanner = banner.addBanner(ctx)
            // } else if (!ctx.request.body.isBanner && String(ctx.request.body.bannerId)) {
            //     ctx.request.query.bannerId = ctx.request.body.bannerId
            //     ctx.request.query.isBackDelBan = true
            //     banner.deleteBanner(ctx)
            // }

            // if (ctx.request.body.isDiscount && !String(ctx.request.body.discountId)) {
            //     resDis = discount.addDiscount(ctx)
            // } else if (!ctx.request.body.isDiscount && String(ctx.request.body.discountId)) {
            //     ctx.request.query.discountId = ctx.request.body.discountId
            //     ctx.request.query.isBackDelDis = true
            //     discount.deleteDiscount(ctx)
            // }
            ctx.body = JSON.stringify({ code: 200, msg: 'success' })
        }
    },

    /* 删除商品 */
    async deleteGoods(ctx) {
        let sqls = sql.deleteGoods(ctx.request.query)
        let dbData = await db.query(sqls).catch(err => {
            ctx.body = JSON.stringify({ code: 500, msg: err })
        })
        if (dbData) {
            ctx.body = JSON.stringify({ code: 200, msg: 'success' })
        }
    }
}

module.exports = goods