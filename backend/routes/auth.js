const router = require('express').Router()

const {
    registerUser,
    loginUser,
    logout,
    forgotPassword,
    resetPassword,
    getUserPortfolio,
    updatePassword
} = require('../controllers/authController')

const { isAuthenticatedUser } = require('../middlewares/auth')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/password/forgot', forgotPassword)
router.put('/password/reset/:token', resetPassword)
router.get('/logout', logout)

router.get('/me', isAuthenticatedUser, getUserPortfolio)
router.put('/password/update', isAuthenticatedUser, updatePassword)

module.exports = router