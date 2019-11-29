const router = require('koa-router')()
const banner = require('../controller/app/banner')
const sort = require('../controller/app/sort')
const discount = require('../controller/app/discount')

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
router.get('/app/getSortGoodsList',sort.getSortGoodsList)


module.exports = router