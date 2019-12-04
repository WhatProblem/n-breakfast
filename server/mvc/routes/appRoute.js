const router = require('koa-router')()
const banner = require('../controller/app/banner')
const sort = require('../controller/app/sort')
const discount = require('../controller/app/discount')
const user = require('../controller/app/user')
const goods = require('../controller/app/goods')
const fav = require('../controller/app/fav')
const cart = require('../controller/app/cart')

/**
 * 获取banner列表
 * @returns {code, msg, data}
 */
router.get('/app/getBannerList', banner.getBannerList)

/**
 * 获取类别列表
 * @returns
 */
router.get('/app/getSortList', sort.getSortList)

/**
 * 获取促销列表
 * @returns
 */
router.get('/app/getDiscountList', discount.getDiscountList)

/**
 * 获取对应分类列表
 * @param {sortId} int
 * @param {pageNum} int
 * @param {pageSize} int
 * @returns {code,msg,data,{total,pages,currentPage,pageNum,pageSize}}
 */
router.get('/app/getSortGoodsList', sort.getSortGoodsList)

/**
 * 用户注册
 * @param {userName} 用户名
 * @param {password} 用户密码
 * @param {avatar} 头像地址
 * @param {province} 省份
 * @param {city} 市
 * @param {country} 区域
 * @param {addrDetail} 详细地址
 * @returns {code, msg}
 */
router.post('/app/register', user.register)

/**
 * 用户登录
 * @param {userName} 用户名称
 * @param {password} 用户密码
 * @returns {code,msg,token}
 */
router.post('/app/login', user.login)

/* 测试 */
router.post('/app/testToken', user.testToken)

/**
 * 商品详情
 * @param {id} 商品id
 * @returns {code, msg, data}
 */
router.get('/app/goodsDetail', goods.goodsDetail)

/**
 * 添加收藏
 * @param {id} 商品id
 * @param {status} int 1: 收藏 2: 取消
 * @returns {code,msg}
 */
router.post('/app/addOrDelFav', fav.addOrDelFav)

/**
 * 添加到购物车
 * @param {id} 商品id
 * @param {goodsNum} 商品数量
 * @param {status} int 1: 添加 2: 删除当前选中 3：清空当前用户购物车
 * @returns {code,msg}
 */
router.post('/app/addOrDelCart', cart.addOrDelCart)

/**
 * 查询商品--模糊查询
 * @param {goodsName} 商品名称
 */
router.get('/app/searchFor', goods.searchFor)

/**
 * 热销新品
 */
router.get('/app/getHotSale', goods.getHotSale)

/**
 * 推荐商品
 */
router.get('/app/getHistory', goods.getHistory)

module.exports = router
