const router = require('koa-router')()
const goods = require('../controller/admin/goods')


router.get('/getTest', goods.getTest)
router.get('/getHome',goods.getHome)
router.post('/postData',goods.postData)
router.get('/goodsList', goods.getGoodsList)

/* 新增商品分类 */
router.post('/addCategory', goods.addCategory)
/* 查看商品分类 */
router.get('/getCategory', goods.getCategory)
/* 新增商品 */
router.post('/addGoods', goods.addGoods)
/* 查看商品列表 */
router.get('/getGoodsList', goods.getGoodsList)

module.exports = router