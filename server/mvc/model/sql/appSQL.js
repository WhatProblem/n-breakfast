const sql = {
    /* 首页banner列表 */
    getBannerList(obj) {
        return `select goods_table.id, goods_table.sort_id, goods_name, price, pic_url, introduce,
                banner_table.banner_id,banner_table.id from banner_table
                inner join goods_table on banner_table.id=goods_table.id`
    },

    /* 首页商品分类列表 */
    getSortList() {
        return 'select * from sort_table'
    },

    /* 获取优惠商品列表 */
    getDiscountList() {
        return `select goods_table.id, goods_table.sort_id, goods_name, price, pic_url, introduce,
                discount_table.discount_id,discount_table.id,discount_table.discount_sum,discount_table.start_time,discount_table.end_time
                from discount_table inner join goods_table on discount_table.id=goods_table.id`
    },

    /* 查询对应分类下的商品列表总数 */
    getSortGoodsTotal(obj) {
        return `select count(*) as total from goods_table where goods_table.sort_id=${obj.sortId}`
    },

    /* 查询对应分类下的商品列表 */
    getSortGoodsList(obj) {
        return `select goods_table.id, goods_table.sort_id, goods_name, price, pic_url, introduce,
                discount_table.discount_id,discount_table.id,discount_table.discount_sum,discount_table.start_time,discount_table.end_time
                from goods_table left join discount_table on discount_table.id=goods_table.id where goods_table.sort_id=${obj.sortId} limit ${(obj.pageNum-1)*obj.pageSize}, ${obj.pageSize}`
    }
}

module.exports = sql