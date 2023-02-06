const router = require('express').Router()
const {getProducts, newProduct} = require('../controllers/productController');

router.get('/product',getProducts)
router.post('/product/new',newProduct)

module.exports = router