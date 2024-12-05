const router = require('express').Router();
const authControllers = require('../controllers/auth.controllers');

router.get('/google', authControllers.loginGoogle);
router.get('/callback', authControllers.callbackGoogle);
router.post('/register', authControllers.registerEmail);
router.post('/login', authControllers.loginEmail);
router.post('/login-admin', authControllers.loginEmailAdmin);
router.post('/logout', authControllers.logout);

module.exports = router;