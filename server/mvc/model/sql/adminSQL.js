const sql = {
    // 测试使用
    test() {
        return 'select * from goods_table'
    },
    /* 查询分类列表 */
    getCategory() {
        return 'select * from sort_table'
    },
    addCategory(val) {
        return `insert into sort_table (sort_name) values ('${val}')`
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
    getAll() {
        // SELECT * ,(SELECT COUNT(*) FROM goods_table) as total_count  FROM goods_table LIMIT 3
        return `select count(*) as total from goods_table`
    },
    getGoods(obj) {
        return `select id, goods_table.sort_id, sort_table.sort_name, goods_name, price, pic_url, introduce from goods_table inner join sort_table on goods_table.sort_id=sort_table.sort_id limit ${(obj.pageNum-1)*obj.pageSize}, ${obj.pageSize}`
    },
    updateGoods(obj) {
        return `update goods_table set sort_id=${obj.sortId}, goods_name='${obj.goodsName}', price=${obj.price}, pic_url='${obj.picUrl}', introduce='${obj.introduce}' where id=${obj.id}`
    },
    deleteGoods(obj) {
        return `delete from goods_table where id=${obj.id}`
    }
}

module.exports = sql