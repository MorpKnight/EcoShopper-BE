const router = require('express').Router();
const goodsControllers = require('../controllers/goods.controllers');

router.get('/', goodsControllers.getGoods);
router.get('/good/:id', goodsControllers.getGood);
router.get('/category/:category', goodsControllers.getGoodsByCategory);
router.get('/name/:name', goodsControllers.getGoodsByName);
router.get('/sr/:sr', goodsControllers.getGoodsBySR);
router.get('/producer/:producer', goodsControllers.getGoodsByProducer);
router.get('/alternative/:alternative', goodsControllers.goodsAlternative);

module.exports = router;