const router = require('express').Router();
const authControllers = require('../controllers/auth.controllers');

router.get('/google', authControllers.loginGoogle);
router.get('/callback', authControllers.callbackGoogle);

module.exports = router;