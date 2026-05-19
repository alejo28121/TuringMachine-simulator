const router = require('express').Router();
const authController = require('../controllers/auth.controller.js');

router.post('/login', authController.login);

module.exports = router;