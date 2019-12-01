const router = require('koa-router')()
const banner = require('../controller/app/banner')
const sort = require('../controller/app/sort')
const discount = require('../controller/app/discount')
const user = require('../controller/app/user')

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

router.post('/app/testToken', user.testToken)

module.exports = router