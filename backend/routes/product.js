const router = require('express').Router()
const {getProducts} = require('../controllers/productController');

router.get('/product',getProducts)

module.exports = router