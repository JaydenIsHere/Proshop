import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import user from './data/user.js'
import products from './data/products.js'
import connectDB from './config/db.js'
import User from './model/userModel.js'
import Product from './model/productModel.js'
import Order from './model/orderModel.js'
dotenv.config()
connectDB()

const importdata = async() =>{
try{
await Order.deleteMany()//clear wipe it out
await Product.deleteMany()
await User.deleteMany()

const createdUsers = await User.insertMany(user)
const adminUser = createdUsers[0]._id

const sampleProducts = products.map(product =>{
    return {...product,user:adminUser}
})
await Product.insertMany(sampleProducts)
console.log('Data Imported'.green.inverse)
process.exit()
}catch(error){
console.error(`${error}`.red.inverse)
process.exit()
}
}


const destroydata = async() =>{
    try{
    await Order.deleteMany()//clear wipe it out
    await Product.deleteMany()
    await User.deleteMany()
    console.log('Data destroyed'.red.inverse)
     process.exit() 
    } catch(error){
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }       
}

if(process.argv[2] === '-d')
{
    destroydata()
}else{
    importdata()
}