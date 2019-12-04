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

    /* 查询商品详情- */
    goodsDetail(obj, status) {
        if (status) {
            return `select goods_table.id, goods_table.sort_id, goods_table.goods_name, goods_table.price, goods_table.pic_url, goods_table.introduce,
                sort_table.sort_name, discount_table.discount_id, discount_table.discount_sum, discount_table.start_time, discount_table.end_time,
                rating_table.ratingId, rating_table.user_id, rating_table.score, rating_table.rating,
                cart_table.cart_id, cart_table.goods_num, fav_table.fav_id
                from goods_table inner join sort_table on goods_table.sort_id=sort_table.sort_id
                left join rating_table on goods_table.id=rating_table.id
                left join discount_table on discount_table.id=goods_table.id
                left join fav_table on (fav_table.user_id=${obj.userId} and fav_table.id=${obj.id})
                left join cart_table on (cart_table.user_id=${obj.userId} and cart_table.id=${obj.id})
                where goods_table.id=${obj.id}`
        }
        return `select goods_table.id, goods_table.sort_id, goods_table.goods_name, goods_table.price, goods_table.pic_url, goods_table.introduce,
                sort_table.sort_name, discount_table.discount_id, discount_table.discount_sum, discount_table.start_time, discount_table.end_time,
                rating_table.ratingId, rating_table.user_id, rating_table.score, rating_table.rating
                from goods_table inner join sort_table on goods_table.sort_id=sort_table.sort_id
                left join rating_table on goods_table.id=rating_table.id
                left join discount_table on discount_table.id=goods_table.id
                where goods_table.id=${obj.id}`
    },

    /* 模糊查询 */
    searchFor(obj) {
        return `select goods_table.id, goods_table.sort_id, goods_name, price, pic_url, introduce, sort_table.sort_name
                from goods_table inner join sort_table on goods_table.sort_id=sort_table.sort_id
                where goods_name like '%${obj.goodsName}%'`
    },

    /* 热销新品 - 取最新创建的10条 */
    getHotSale() {
        return `select goods_table.id, goods_table.sort_id, goods_name, price, pic_url, introduce, sort_table.sort_name
                from goods_table inner join sort_table on goods_table.sort_id=sort_table.sort_id
                order by goods_table.id desc limit 0,10`
    },

    /* 推荐商品 - 取最早创建的10条 */
    getHistory() {
        return `select goods_table.id, goods_table.sort_id, goods_name, price, pic_url, introduce, sort_table.sort_name
                from goods_table inner join sort_table on goods_table.sort_id=sort_table.sort_id
                order by goods_table.id asc limit 0,10`
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
    },

    /* 先查询数据是否已经存在 */
    getCart(obj) {
        return `select cart_id from cart_table where user_id=${obj.userId} and id=${obj.id} limit 1`
    },

    /* 如果数据存在就更新 */
    updateCart(obj) {
        return `update cart_table set goods_num=${obj.goodsNum} where id=${obj.id} and user_id=${obj.userId}`
    },

    /* 添加到购物车 */
    addCart(obj) {
        // return `insert into cart_table (id,user_id,goods_num)  values (${obj.id}, ${obj.userId}, ${obj.goodsNum}) on  DUPLICATE key update goods_num=values(goods_num)`
        return `insert into cart_table(id, user_id, goods_num) values (${obj.id}, ${obj.userId}, ${obj.goodsNum})`
    },

    /* 从购物车删除 */
    deleteCart(obj) {
        return `delete from cart_table where id=${obj.id} and user_id=${obj.userId}`
    },
    
    /* 清空购物车当前用户所有数据 */
    clearCart(obj) {
        return `delete from cart_table where user_id=${obj.userId}`
    }
}

module.exports = sql