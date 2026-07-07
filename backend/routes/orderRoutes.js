
const express = require('express');
const {protect} = require('../middleware/authMiddleware');
const {admin} = require('../middleware/adminMiddleware');
const {createOrder, getOrders, myOrders, updateOrderStatus} = require('../controller/orderController');

const router = express.Router();

router.route('/').post(protect, createOrder).get(protect, admin, getOrders);  
router.route('/:myorders').get(protect,myOrders);  // getOrderById function sare users ka data leke aayega. protect and admin ka kaam middleware me krege ye dono hamre middleware hai getUsers function run hone se phle indono ke pass jayega cheez.

router.route('/:id/status').put(protect,admin,updateOrderStatus);

module.exports = router;
