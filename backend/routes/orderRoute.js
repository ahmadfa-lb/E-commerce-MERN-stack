import express from 'express'
import {placeOrder, allOrders, userOrders, updateStatus} from '../controllers/orderController.js'
import adminAuth  from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'
import { updatePaymentStatus } from '../controllers/orderController.js';

const orderRouter = express.Router()

// Admin Features
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

// Payment Features
orderRouter.post('/place',authUser,placeOrder)


// User Feature 
orderRouter.post('/userorders',authUser,userOrders)

orderRouter.post('/payment', authUser, updatePaymentStatus);



export default orderRouter