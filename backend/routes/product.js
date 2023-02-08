const router = require('express').Router();
const {
    getProducts,
    newProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');
const {isAuthenticatedUser, authorizeRoles} = require('../middlewares/auth')


router.get('/product', getProducts)
router.get('/product/:id', getSingleProduct)
router.post('/product/new',isAuthenticatedUser, authorizeRoles('admin'), newProduct)
router.put('/product/:id', isAuthenticatedUser, authorizeRoles('admin'), updateProduct)
router.delete('/product/:id',isAuthenticatedUser, authorizeRoles('admin'), deleteProduct)

module.exports = router