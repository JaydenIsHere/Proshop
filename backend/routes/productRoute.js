import express from 'express'
const router = express.Router();
import {
    deleteProduct, 
    getProducts,
    getSigleProduct,
    updateProduct,
    createProduct,
    createProductReview,
    deleteProductReview,
    updateProductReview,
    getTopProduct
} from '../controllers/productControllers.js'

import {protect,admin} from '../middleware/authMiddleware.js'



router.route('/')
.get(getProducts)
.post(protect,admin,createProduct)

router.route('/top')
.get(getTopProduct)

router.route('/:id')
.get(getSigleProduct)
.delete(protect,admin,deleteProduct)
.put(protect,admin,updateProduct)

router.route('/:id/reviews')
.post(protect,createProductReview)
.delete(protect,deleteProductReview)
.put(protect,updateProductReview)
export default router