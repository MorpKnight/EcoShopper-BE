const router = require('express').Router();
const adminControllers = require('../controllers/admin.controllers');

router.post('/addProduct', adminControllers.addProduct);
router.post('/addProducer', adminControllers.addProducer);
router.put('/editProduct', adminControllers.editProduct);
router.put('/editProducer', adminControllers.editProducer);
router.delete('/deleteProduct', adminControllers.deleteProduct);
router.delete('/deleteProducer', adminControllers.deleteProducer);

module.exports = router;