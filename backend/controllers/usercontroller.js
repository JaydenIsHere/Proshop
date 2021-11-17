import User from '../model/userModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateTooken.js'
// Auth user & get token
// POST /api/users/login
// public
const authUser = asyncHandler (async (req,res)  =>{
const {email,password} = req.body
const user = await User.findOne({email})

if(user && (await user.matchPassword(password)))
//password from req.body and matchPassword will find the password in database to compare
{
    res.json({//if matched we pass token to user
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
        token:generateToken(user._id)
    })
}else{
    res.status(401)
    throw new Error('Invalid password')
}
})

// user registration
// POST /api/users
// public
const registerUser = asyncHandler (async (req,res)  =>{
    const {name,email,password} = req.body
    const userExists = await User.findOne({email})
    
    if(userExists)
    {
        res.status(400)
        throw new Error('User already exits')
    }
    const user = await User.create({
        name,
        email,
        password
    })

    if(user)//if user is created
    {
res.status(201).json({
    _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
        token:generateToken(user._id)
    })

    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
    })

// get user profile
// GET /api/users/profile
// private
const getUserProfile = asyncHandler (async (req,res)  =>{
  
  if(req.user)
 {
     const {user} = req
     res.json({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
     })
 }
 else{
    res.status(404)
    throw new Error('User not found')
 }
    })
// update user profile
// PUT /api/users/profile
// private
    const updateUserProfile = asyncHandler (async (req,res)  =>{
            if(req.user)
            {
            const {user} = req
            user.name = req.body.name || user.name
            user.email = req.body.email || user.email
       
            if(req.body.password){
               user.password = req.body.password
            }
            const updateUser = await user.save()
            return res.json({
               _id:updateUser._id,
               name:updateUser.name,
               email:updateUser.email,
               isAdmin:updateUser.isAdmin,
               token:generateToken(updateUser._id),
           })
            } 
            else{
               res.status(404)
               throw new Error('User not found')
            }       
        })
  // get all user 
// GET /api/users
// private/admin
const getAllusers = asyncHandler (async (req,res)  =>{
       const allUsers = await User.find({})
       res.json(allUsers)
      })  
      
// delete user 
// DELETE /api/users/:id
// private/admin
const adminDeleteUser = asyncHandler (async (req,res)  =>{

    const user = await User.findById(req.params.id)
    if(user){
    user.remove()
    res.json({message:'User removed'})
    }else{
        res.status(404)
        throw new Error('No user found')
    }
   })  

   // get user by ID 
// GET /api/users/:id
// private/admin
const adminGetUserById= asyncHandler (async (req,res)  =>{
    const user = await User.findById(req.params.id)
    if(user){
    res.json(user)
    }else{
        res.status(404)
        throw new Error('No user found')
    }
   })  
   
// update user profile
// PUT /api/users/profile
// private
const adminUpdateUser = asyncHandler (async (req,res)  =>{

    const user =  await User.findById(req.params.id) 
    if(user)
    {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin
    const updateUser = await user.save()
    return res.json({
       _id:updateUser._id,
       name:updateUser.name,
       email:updateUser.email,
       isAdmin:updateUser.isAdmin
   })
    } 
    else{
       res.status(404)
       throw new Error('User not found')
    }       
})
export {authUser,
    getUserProfile,
    registerUser,
    updateUserProfile,
    getAllusers,
    adminDeleteUser,
    adminGetUserById,
    adminUpdateUser}