const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');


router.post('/signup', authController.signup);
router.get('/login', authController.login);


// router.get('/logout', authController.logout);

module.exports = router;
