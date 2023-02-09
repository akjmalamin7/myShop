const router = require('express').Router()

const {
    registerUser,
    loginUser,
    logout,
    forgotPassword,
    resetPassword,
    getUserPortfolio,
    updatePassword,
    updateProfile,
    allUsers,
    getUserDetails
} = require('../controllers/authController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/password/forgot', forgotPassword)
router.put('/password/reset/:token', resetPassword)
router.get('/logout', logout)

router.get('/me', isAuthenticatedUser, getUserPortfolio)
router.put('/me/update', isAuthenticatedUser, updateProfile)
router.put('/password/update', isAuthenticatedUser, updatePassword)

router.get('/admin/users', isAuthenticatedUser, authorizeRoles('admin'), allUsers)
router.get('/admin/user/:id', isAuthenticatedUser, authorizeRoles('admin'), getUserDetails)

module.exports = router