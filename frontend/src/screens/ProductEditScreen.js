
import axios from 'axios'
import React, { useState,useEffect }from 'react'
import {useDispatch,useSelector} from 'react-redux'
import FormConstainer from '../components/FormConstainer'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import{ Button, Form } from 'react-bootstrap'
import {listproductUpdate,listProductDetails} from '../actions/productAction'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstant'

const ProductEditScreen = ({match,history}) =>{
    const productId = match.params.id
    const dispatch = useDispatch()

    const [name,setName] = useState('')
    const [price,setPrice] = useState(0)
    const [brand,setBrand] = useState('')
    const [category,setCategory] = useState('')
    const [countInStock,setCountInStock] = useState('')
    const [description,setDescription] = useState('')
    const [image,setImage] = useState('')
    const [uploading,setUploading] = useState(false)

    const productDetails = useSelector(state => state.productDetails)
    const { error , product,loading} = productDetails


    const productUpdate = useSelector(state => state.productUpdate)
    const { error:errorUpdate ,loading:loadingUpdate ,success:successUpdate} = productUpdate

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    useEffect(() =>{

        if(successUpdate)
        {
            dispatch({type:PRODUCT_UPDATE_RESET})
            history.push('/admin/productlist')
        }else{
            if(!product.name || product._id !== productId)//product._id = params.id
            {
                dispatch(listProductDetails(productId))//we get user
            }else{
                setName(product.name)
                setPrice(product.price)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
                setImage(product.image)
        }
        }
        

    },[dispatch,productId,product,history,successUpdate])

    const uploadFileHandler = async (e) =>{
        const file = e.target.files[0]//The input value 
        const formData = new FormData()
        formData.append('image',file)//name= image , input value = file
        setUploading(true)
        try{
    const config = {
    headers:{
        "Content-Type" : "multipart/form-data",
        Authorization:`Bearer ${userInfo.token}`
         }
    }
    const {data} = await axios.post('/api/upload',formData,config)
    setImage(data)//what we send back is a path
    setUploading(false)
        }catch(error){
        console.error(error)
        setUploading(false)
        }
    }
    const submitHandler = (e) =>{
        e.preventDefault()//prevent refresh 
        dispatch(listproductUpdate({
            _id:productId,
        name,
        price,
        brand,
        category,
        countInStock,
        description,
        image
        }))
    }
  

   return (
    <>
    <Link to="/admin/productlist" className='btn btn-light my-3'>
        Go Back
    </Link>
    <FormConstainer>
       <h1>Edit Product</h1>
       {loadingUpdate && <Loader/>}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
     {loading ? <Loader/> :error ? <Message varaint='danger'> {error}</Message> :(
         <Form onSubmit={submitHandler} className='mb-3'>


            <Form.Group controlId='name'>
             <Form.Label>Name</Form.Label>
             <Form.Control type='text' placeholder='Enter name' className='mb-3' value={name} onChange={e => setName(e.target.value)}/>
         </Form.Group>

         <Form.Group controlId='price'>
             <Form.Label>Price</Form.Label>
             <Form.Control type='number' placeholder='Enter price' className='mb-3' value={price} onChange={e => setPrice(e.target.value)}/>
         </Form.Group>

         <Form.Group controlId='image'>
         <Form.Label>Image</Form.Label>
             <Form.Control type='text' placeholder='Enter image' className='mb-3' value={image} onChange={e => setImage(e.target.value)}/>
             <Form.File
              id='image-file' 
              label='Choose File' 
              custom onChange={uploadFileHandler}>
              </Form.File>
              {uploading && <Loader/>}
         </Form.Group>
  
    
         <Form.Group controlId='brand'>
         <Form.Label>Brand</Form.Label>
             <Form.Control type='text' placeholder='Enter brand' className='mb-3' value={brand} onChange={e => setBrand(e.target.value)}/>
         </Form.Group>


         <Form.Group controlId='category'>
         <Form.Label>Category</Form.Label>
             <Form.Control type='text' placeholder='Enter category' className='mb-3' value={category} onChange={e => setCategory(e.target.value)}/>
         </Form.Group>
  
         <Form.Group controlId='description'>
         <Form.Label>Description</Form.Label>
             <Form.Control type='text' placeholder='Enter description' className='mb-3' value={description} onChange={e => setDescription(e.target.value)}/>
         </Form.Group>

         <Form.Group controlId='countInStock'>
         <Form.Label>CountInStock</Form.Label>
             <Form.Control type='text' placeholder='Enter countInStock' className='mb-3' value={countInStock} onChange={e => setCountInStock(e.target.value)}/>
         </Form.Group>

         <Button type='submit' variant='primary'>Update</Button>
         </Form>
     )}    
   </FormConstainer>
    </>
   
   )
}

export default ProductEditScreen