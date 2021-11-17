import express from 'express'
const router = express.Router()
import { 
    authUser,
    getUserProfile,
    registerUser,
    updateUserProfile,
    getAllusers,
    adminDeleteUser ,
    adminGetUserById,
    adminUpdateUser
} from '../controllers/usercontroller.js'
import {protect,admin} from '../middleware/authMiddleware.js'

router.route('/').post(registerUser)
router.route('/').get(protect,admin,getAllusers)

router.post('/login',authUser)

router.route('/profile')
.get(protect,getUserProfile)
.put(protect,updateUserProfile)

router.route('/:id')
.delete(protect,admin,adminDeleteUser )
.get(protect,admin,adminGetUserById)
.put(protect,admin,adminUpdateUser)
export default router