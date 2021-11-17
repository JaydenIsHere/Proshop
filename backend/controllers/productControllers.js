import Product  from '../model/productModel.js'

import asyncHandler from 'express-async-handler'

// Fetch all products
// GET /api/products
//public
const getProducts = asyncHandler(async (req,res)  =>{

const pageSize = 2
const page = Number(req.query.pageNumber) || 1 //number of page

    const keyword = req.query.keyword ? {//if there's keyword then we search that keyword in database
    name:{
        $regex: req.query.keyword,
        $options:'i'
    }
    }:{}
const count= await Product.countDocuments({...keyword })//count function from mongoose
    const products = //paginate
    await Product
    .find({...keyword})
    .limit(pageSize)//control load how many product
    .skip(pageSize * (page -1))
    res.json({products,page,pages:Math.ceil(count / pageSize)})
})

// Fetch single products
// GET /api/products/:id
//public
const getSigleProduct = asyncHandler(async(req,res) =>{
    const product = await Product.findById(req.params.id)
    if(product)
    {
        res.json(product)
    }
    else{
        res.status(404)
        throw new Error('product not found')
    } 
})



// Delete single product
// GET /admin/products/:id
//private
const deleteProduct = asyncHandler(async(req,res) =>{
    const product = await Product.findById(req.params.id)
    if(product)
    {
        await product.remove()
        res.json({message:'Product Deleted'})
    }
    else{
        res.status(404)
        throw new Error('product not found')
    } 
})

// Update product
// PUT /admin/products/:id
//private
const updateProduct = asyncHandler(async(req,res) =>{
    const product = await Product.findById(req.params.id)
    if(product)
    {
        product.name = req.body.name,
        product.price = req.body.price,
        product.image = req.body.image,
        product.brand = req.body.brand,
        product.countInStock = req.body.countInStock,
        product.description = req.body.description,
        product.category = req.body.category
        const updatedProduct = await product.save()
        res.json(updatedProduct)
    }else{
        res.status(401)
        throw new Error('No product found')
    }

}
)

// Create product
// GET /admin/products/
//private
const createProduct = asyncHandler(async(req,res) =>{
    const product = await new Product({
        name:'Product name',
        price:0,
        user:req.user._id,
        image:'/images/sample.jpg',
        brand:'Productcategory',
        category:'Product category',
        countInStock:0,
        numReviews:0,
        description:'Product Description',
    })
const createProduct =await product.save()
res.status(200).json(createProduct)
})

// Create Create new review
// POST api/products/:id/reviews
//private
const createProductReview = asyncHandler(async(req,res) =>{
    const {rating , comment} = req.body
    const product = await  Product.findById(req.params.id )
    if(product)
    {
        const alreadyReviewed = product.reviews.find((r) => r.user.toString() === req.user._id.toString())//if this user in the review already exist 
        if(alreadyReviewed)
        {
            res.status(400)
            throw new Error('Product already reviewed')
        }
        const review = {
            name:req.user.name,
            rating:Number(rating),
            comment,
            user:req.user._id,
       }//create review object and haven't save yet
       product.reviews.push(review)
       product.numReviews = product.reviews.length
    
       product.rating = //this rating is for overall rating
       product.reviews.reduce((acc,item) =>item.rating +acc,0) / product.reviews.length//give us average rating

       await product.save()
       res.status(201).json({message:'Review added'})
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
  
})


// delete review
// delete api/products/:id/reviews
//private
const deleteProductReview = asyncHandler(async(req,res) =>{
 
const product = await Product.findById(req.params.id);

if(product)
{
    const reviews = product.reviews.filter(review => review.user.toString() !== req.user.id.toString());

    const rating = product.reviews.reduce((acc,item) => item.rating +acc,0) / product.reviews.length//update the rating
    
    const numReviews = product.reviews.length//update num
    
    await Product.findByIdAndUpdate(req.params.id,{
        reviews,
        rating,
        numReviews
    })
    res.status(201).json({message:'Review Deleted'})
}
else{
    res.status(401)
    throw new Error('No Product found')
}

})

// update review
// put api/products/:id/reviews
//private
const updateProductReview = asyncHandler(async(req,res) =>{
    const {comment , rating:ratings} =req.body
    const product = await Product.findById(req.params.id);
    
    if(product)
    {
        const targetReview = product.reviews.find((review) =>  review.user.toString() === req.user.id.toString())
        
            targetReview.comment = comment,
            targetReview.rating = ratings,
            targetReview.user = req.user._id,
            targetReview.name = req.user.name
        
        const rating = product.reviews.reduce((acc,item) => item.rating +acc,0) / product.reviews.length//update the rating
    
        const numReviews = product.reviews.length
        await product.save()
        res.status(201).json({message:'Review Updated'})
    }
    else{
       
        res.status(401)
        throw new Error('No Product found')
    }
    
    })

// top rated products
// Get api/products/top
//public
const getTopProduct = asyncHandler(async(req,res) =>{
    const products = await Product.find({}).sort({rating:-1}).limit(3)

    res.json(products)

})
export {getProducts,getSigleProduct,deleteProduct,updateProduct,createProduct,createProductReview,deleteProductReview,updateProductReview,getTopProduct }