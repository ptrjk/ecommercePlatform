const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');


router.post('/login', authController.postLogin);

router.get('/verifyToken', authController.verifyToken);

router.get('/verifyTokenValidity', authController.verifyTokenValidity);




module.exports = router