const sql = {
    // 测试使用
    test() {
        return 'select * from goods_table'
    },
    /* 查询分类列表 */
    getCategory() {
        return 'select * from sort_table'
    },
    addCategory(obj) {
        return `insert into sort_table (sort_name, sort_icon) values ('${obj.sortName}', '${obj.sortIcon}')`
    },
    getCategoryId() {
        return 'select max(sort_id) as sortId from sort_table'
    },
    addGoods(obj) {
        return `insert into goods_table (sort_id, goods_name, price, pic_url, introduce) values (${obj.sortId}, '${obj.goodsName}', ${obj.price}, '${obj.picUrl}', '${obj.introduce}')`
    },
    getGoodsId() {
        return 'select max(id) as id from goods_table'
    },
    getAll(obj) {
        return `select count(*) as total from goods_table 
                inner join sort_table on goods_table.sort_id=sort_table.sort_id 
                where goods_name like '%${obj.findName}%' or sort_name like '%${obj.findName}%'`
    },
    getGoods(obj) {
        return `select goods_table.id, goods_table.sort_id, goods_name, price, pic_url, introduce,
                sort_table.sort_name, banner_table.banner_id, discount_table.discount_id, discount_table.discount_sum, discount_table.start_time, discount_table.end_time
                from goods_table inner join sort_table on goods_table.sort_id=sort_table.sort_id
                left join banner_table on goods_table.id=banner_table.id
                left join discount_table on discount_table.id=goods_table.id
                where goods_name like '%${obj.findName}%' or sort_name like '%${obj.findName}%' limit ${(obj.pageNum-1)*obj.pageSize}, ${obj.pageSize}`
    },
    updateGoods(obj) {
        return `update goods_table set sort_id=${obj.sortId}, goods_name='${obj.goodsName}', price=${obj.price}, pic_url='${obj.picUrl}', introduce='${obj.introduce}' where id=${obj.id}`
    },
    deleteGoods(obj) {
        return `delete from goods_table where id=${obj.id}`
    },

    /* banner部分 */
    getBannerId() {
        return `select max(banner_id) as banner_id from banner_table `
    },
    addBanner(obj) {
        return `insert into banner_table(id) values (${obj.id})`
    },
    updateBanner(obj) {
        return `update banner_table set id=${obj.id} where banner_id=${obj.bannerId}`
    },
    deleteBanner(obj) {
        return `delete from banner_table where banner_id=${obj.bannerId}`
    },

    /* 限时优惠促销部分 */
    getDiscountId() {
        return `select max(discount_id) as discount_id from discount_table `
    },
    addDiscount(obj) {
        return `insert into discount_table(id, discount_sum, start_time, end_time) values (${obj.id}, ${obj.discountSum}, '${obj.startTime}', '${obj.endTime}')`
    },
    updateDiscount(obj) {
        return `update discount_table set discount_sum=${obj.discountSum}, start_time='${obj.startTime}', end_time='${obj.endTime}' where discount_id=${obj.discountId}`
    },
    deleteDiscount(obj) {
        return `delete from discount_table where discount_id=${obj.discountId}`
    }
}

module.exports = sql