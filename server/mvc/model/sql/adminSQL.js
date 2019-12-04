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
                where goods_name like '%${obj.findName}%' or sort_name like '%${obj.findName}%' order by goods_table.id desc limit ${(obj.pageNum-1)*obj.pageSize}, ${obj.pageSize}`
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
    },
    /* 查询用户列表 */
    getAllUser(obj) {
        return `select count(*) as total from user_table
                where user_name like '%${obj.userName}%'`
    },
    getUserList(obj) {
        return `select user_table.user_id, user_table.user_name, user_table.avatar, user_table.province, user_table.city, user_table.country, user_table.addr_detail from user_table
                where user_name like '%${obj.userName}%' order by user_table.user_id asc limit ${(obj.pageNum-1)*obj.pageSize}, ${obj.pageSize}`
    },
    /* 查询收藏列表 */
    getAllFav(obj) {
        return `select count(*) as total from fav_table
                inner join user_table on user_table.user_id=fav_table.user_id
                left join goods_table on fav_table.id=goods_table.id
                where user_table.user_name like '%${obj.searchKey}%' or goods_table.goods_name like '%${obj.searchKey}%'`
    },
    getFavList(obj) {
        return `select user_table.user_id, user_table.user_name, fav_table.fav_id, goods_table.goods_name, goods_table.price from fav_table
                inner join user_table on user_table.user_id=fav_table.user_id
                left join goods_table on fav_table.id=goods_table.id
                where user_table.user_name like '%${obj.searchKey}%' or goods_table.goods_name like '%${obj.searchKey}%' order by fav_table.fav_id asc limit ${(obj.pageNum-1)*obj.pageSize}, ${obj.pageSize}`
    },
    /* 查询购物车列表 */
    getAllCart(obj) {
        return `select count(*) as total from cart_table
                inner join user_table on user_table.user_id=cart_table.user_id
                left join goods_table on cart_table.id=goods_table.id
                where user_table.user_name like '%${obj.searchKey}%' or goods_table.goods_name like '%${obj.searchKey}%'`
    },
    getCartList(obj) {
        return `select user_table.user_id, user_table.user_name, cart_table.cart_id, goods_table.goods_name, goods_table.price, cart_table.goods_num from cart_table
                inner join user_table on user_table.user_id=cart_table.user_id
                left join goods_table on cart_table.id=goods_table.id
                where user_table.user_name like '%${obj.searchKey}%' or goods_table.goods_name like '%${obj.searchKey}%' order by cart_table.cart_id asc limit ${(obj.pageNum-1)*obj.pageSize}, ${obj.pageSize}`
    },
}

module.exports = sql