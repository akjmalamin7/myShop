const router = require('express').Router()
const {
    getProducts,
    newProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

router.get('/product', getProducts)
router.get('/product/:id', getSingleProduct)
router.post('/product/new', newProduct)
router.put('/product/:id', updateProduct)
router.delete('/product/:id', deleteProduct)

module.exports = router