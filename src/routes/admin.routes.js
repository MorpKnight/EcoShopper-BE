const router = require('express').Router();
const adminControllers = require('../controllers/admin.controllers');
const { verifyToken, isAdmin } = require('../middlewares/auth.middlewares');

router.use(verifyToken, isAdmin);

router.post('/add-product', adminControllers.addProduct);
router.post('/add-producer', adminControllers.addProducer);
router.put('/edit-product', adminControllers.editProduct);
router.put('/edit-producer', adminControllers.editProducer);
router.delete('/delete-product', adminControllers.deleteProduct);
router.delete('/delete-producer', adminControllers.deleteProducer);

module.exports = router;