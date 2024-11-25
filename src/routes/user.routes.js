const userControllers = require('../controllers/user.controllers');
const { verifyToken } = require('../middlewares/auth.middlewares');
const router = require('express').Router();

router.use(verifyToken);
router.get('/profile', userControllers.getUserProfile);
router.post('/buy', userControllers.buyProduct);

module.exports = router;