const router = require('koa-router')()
const goods = require('../controller/admin/goods')
const banner = require('../controller/admin/banner')
const discount = require('../controller/admin/discount')


router.get('/getTest', goods.getTest)
router.get('/getHome', goods.getHome)
router.post('/postData', goods.postData)
router.get('/goodsList', goods.getGoodsList)

/**
 * 新增商品分类
 * @param {sortName} - 分类名称
 * @returns {sortId, sortName}
 */
router.post('/addCategory', goods.addCategory)

/**
 * 查看商品分类
 * @desc 无参数
 * @returns {sortId, sortName}
 */
router.get('/getCategory', goods.getCategory)

/**
 * 新增商品
 * @param {sortId} int 分类sortId
 * @param {goodsName} String 商品名称
 * @param {price} decimal 商品价格，保留两位小数
 * @param {picUrl} String 商品海报
 * @param {introduce} String 商品介绍
 * @returns {sortId,goodsName,price,picUrl,introduce,id}
 */
router.post('/addGoods', goods.addGoods)

/**
 * 查询商品列表
 * @param {findName} String 查询关键字
 * @param {pageNum} int 分页页数
 * @param {pageSize} int 分页条数
 * @returns {id,sortId,goodsName,price,picUrl,introduce,sortName,bannerId,discountId,discountSum,startTime,endTime}
 */
router.get('/getGoodsList', goods.getGoods)

/**
 * 修改商品信息
 * @param {sortId}
 * @param {goodsName}
 * @param {price}
 * @param {picUrl}
 * @param {introduce}
 * @param {id} 商品id
 */
router.put('/updateGoods', goods.updateGoods)

/**
 * 删除指定商品
 * @param {id}
 */
router.del('/deleteGoods', goods.deleteGoods)

/**
 * 新增轮播
 * @param {id} - 商品id
 * @returns {id,bannerId}
 */
router.post('/addBanner', banner.addBanner)

/**
 * 删除轮播
 * @param {bannerId} - 商品被选中后的bannerId
 */
router.del('/deleteBanner', banner.deleteBanner)

/**
 * 新增优惠商品
 * @param {id}
 * @param {discountSum}
 * @param {startTime}
 * @param {endTime}
 * @returns {id, discountSum,startTime,endTime,discountId}
 */
router.post('/addDiscount', discount.addDiscount)

/**
 * 删除优惠商品
 * @param {discountId}
 */
router.del('/deleteDiscount', discount.deleteDiscount)

/** 
 * 修改优惠商品信息
 * @param {discountId}
 * @param {discountSum}
 * @param {startTime}
 * @param {endTime}
 */
router.put('/updateDiscount', discount.updateDiscount)

module.exports = router