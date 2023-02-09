const router = require('express').Router();
const {
    getProducts,
    newProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getProductReviews,
    deleteProductReview
} = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')


router.get('/product', getProducts)
router.get('/product/:id', getSingleProduct)
router.post('/product/new', isAuthenticatedUser, authorizeRoles('admin'), newProduct)
router.put('/product/:id', isAuthenticatedUser, authorizeRoles('admin'), updateProduct)
    .delete('/product/:id', isAuthenticatedUser, authorizeRoles('admin'), deleteProduct)

router.put('/review', isAuthenticatedUser, createProductReview)
router.get('/reviews', isAuthenticatedUser, getProductReviews)
router.delete('/reviews', isAuthenticatedUser, deleteProductReview)

module.exports = router