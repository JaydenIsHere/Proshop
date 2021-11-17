import express from 'express'
const router = express.Router()
import {addOerderItems,getOrderById,updateOrderToPaid,getMyOrder,getAllOrders,updateOrderToDelivered} from '../controllers/orderController.js'
import {protect,admin} from '../middleware/authMiddleware.js'

router.route('/myorders').get(protect,getMyOrder)
router.route('/').post(protect,addOerderItems).get(protect,admin,getAllOrders)
router.route('/:id').get(protect,getOrderById)
router.route('/:id/pay').put(protect,updateOrderToPaid)
router.route('/:id/deliver').put(protect,updateOrderToDelivered)

export default router