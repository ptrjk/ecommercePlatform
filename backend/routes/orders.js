const express = require('express');
const router = express.Router();

const ordersController = require('../controllers/orders');
const verifyToken = require('../controllers/auth').verifyToken;


router.get('/orders', verifyToken, ordersController.getOrders);

router.post('/order', ordersController.postOrder);

router.post('/order/:orderId/updatestatus', verifyToken, ordersController.postUpdateStatusOrder)

router.get('/order/:orderId', verifyToken, ordersController.getOrderDetails);




module.exports = router;