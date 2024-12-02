const router = require('express').Router();
const producerControllers = require('../controllers/producer.controllers');

router.get('/', producerControllers.getProducers);
router.get('/producer/:id', producerControllers.getProducer);
router.get('/goods/:producer_id', producerControllers.getProducerGoods);
router.get('/name/:name', producerControllers.getProducerByName);
router.get('/location/:location', producerControllers.getProducerByLocation);

module.exports = router;