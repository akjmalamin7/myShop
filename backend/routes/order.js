const express = require('express')
const router = express.Router()

const {newOrders} = require('../controllers/orderController')
const {isAuthenticatedUser, authorizeRoles, getSingleOrder} = require('../middlewares/auth')

router.route('/order/new').post(isAuthenticatedUser, newOrders)

router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder)
router.route('/orders/me').get(isAuthenticatedUser, newOrders)

module.exports = router