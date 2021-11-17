
import path from 'path'
import express from 'express'
import dotenv  from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import productRoute from './routes/productRoute.js'
import userRoute from './routes/userRoute.js'
import orderRoute from './routes/orderRoute.js'
import uploadRoute from'./routes/uploadRoute.js'
import {notFound,errorHandler} from './middleware/errorMiddleware.js'
import morgan from 'morgan'
import pkg from 'cloudinary'
const cloudinary = pkg
if(process.env.NODE_ENV !== 'production'){
    dotenv.config(); 
}
connectDB()
const app =express();
if(process.env.NODE_ENV === 'development')
{
    app.use(morgan('dev'))//print out the HTTP request method
}


app.use(express.json())
app.use(express.urlencoded({ extended: true }))


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

app.use('/api/products',productRoute)

app.use('/api/users',userRoute)

app.use('/api/orders',orderRoute)

app.use('/api/upload',uploadRoute)

app.get('/api/config/paypal',(req,res) => {
    res.send(process.env.PAYPAL_CLIENT_ID)
}
)
const __dirname = path.resolve()
app.use('/upload',express.static(path.join(__dirname,'/upload')))//point to the file 

if(process.env.NODE_ENV ==='production')
{
    app.use(express.static(path.join(__dirname,'/frontend/build')))
    //set static folder E:\all_project\webeccomerce\frontend/build

app.get('*',(req,res) => res.sendFile(path.resolve(__dirname, 'frontend','build','index.html')))
//anyroute that's not any of these up here are API is going to point to this index HTML that's in that static folder.
//simple to say is we get everything from frontend
 
}else{
    app.get('/',(req,res) =>{
        res.send('API is sending')
    })
}

app.use(notFound)

//express error message
app.use(errorHandler)

const port = process.env.PORT || 5000;

app.listen(port ,console.log(`we are running ${process.env.NODE_ENV} and listen to port ${port}`.yellow.bold))