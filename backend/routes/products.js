const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');
const upload = require('../app');

router.get('/products/:category', productsController.getProducts);

router.post('/createproduct', upload.single('file'), productsController.postCreateProduct);

router.delete('/delete/:productId', productsController.deleteProduct);

module.exports = router;
