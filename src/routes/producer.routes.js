const router = require('express').Router();
const producerControllers = require('../controllers/producer.controllers');

router.get('/', producerControllers.getProducers);
router.get('/producer', producerControllers.getProducer);
router.get('/goods', producerControllers.getProducerGoods);
router.get('/name', producerControllers.getProducerByName);
router.get('/location', producerControllers.getProducerByLocation);

module.exports = router;