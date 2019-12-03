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
                from goods_table left join discount_table on discount_table.id=goods_table.id where goods_table.sort_id=${obj.sortId} limit ${(obj.pageNum - 1) * obj.pageSize}, ${obj.pageSize}`
    },

    /* 插入注册用户数据 */
    register(obj) {
        return `insert into user_table (user_name, user_hash, avatar, province, city, country, addr_detail) 
                values ('${obj.userName}', '${obj.userHash}', '${obj.avatar}', '${obj.province}', '${obj.city}', '${obj.country}', '${obj.addrDetail}')`
    },

    /* 判断数据库中用户是否存在 */
    login(obj) {
        // INSERT INTO t_stock_chg(f_market, f_stockID, f_name) VALUES('SH', '600000', '白云机场') ON DUPLICATE KEY UPDATE f_market='SH', f_name='浦发银行'
        return `select * from user_table where user_name = '${obj.userName}' limit 1`
    },

    /* 查询商品详情 */
    goodsDetail(id) {
        return `select goods_table.id, goods_table.sort_id, goods_table.goods_name, goods_table.price, goods_table.pic_url, goods_table.introduce,
                sort_table.sort_name, discount_table.discount_id, discount_table.discount_sum, discount_table.start_time, discount_table.end_time,
                rating_table.ratingId, rating_table.user_id, rating_table.score, rating_table.rating
                from goods_table inner join sort_table on goods_table.sort_id=sort_table.sort_id
                left join rating_table on goods_table.id=rating_table.id
                left join discount_table on discount_table.id=goods_table.id
                where goods_table.id=${id}`
    },

    /* 获取最新注册用户的user_id */
    getUserId() {
        return `select max(user_id) as user_id from user_table `
    },

    /* 添加到收藏列表 */
    addFav(obj) {
        return `insert into fav_table(id, user_id) values (${obj.id}, ${obj.userId})`
    },

    /* 删除收藏 */
    deleteFav(obj) {
        return `delete from fav_table where id=${obj.id} and user_id=${obj.userId}`
    }
}

module.exports = sql