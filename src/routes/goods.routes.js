const router = require('express').Router();
const goodsControllers = require('../controllers/goods.controllers');

router.get('/', goodsControllers.getGoods);
router.get('/good', goodsControllers.getGood);
router.get('/category', goodsControllers.getGoodsByCategory);
router.get('/name', goodsControllers.getGoodsByName);
router.get('/sr', goodsControllers.getGoodsBySR);
router.get('/producer', goodsControllers.getGoodsByProducer);
router.get('/alternative', goodsControllers.goodsAlternative);

module.exports = router;