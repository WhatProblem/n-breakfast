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
    }
}

module.exports = sql