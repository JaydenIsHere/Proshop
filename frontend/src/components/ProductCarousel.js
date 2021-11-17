import React,{useEffect} from 'react'

import { productTop } from '../actions/productAction'//fire off this action(function)
import { Carousel ,Image} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Message from './Message'
import {useDispatch,useSelector} from 'react-redux'

const ProductCarousel = () => {
   const dispatch = useDispatch()
    const productTopRated = useSelector(state => state.productTopRated)
const {error,products,loading} = productTopRated

useEffect(() =>{
dispatch(productTop())
},[dispatch])

    return  error ? <Message variant='danger'>{error}</Message> : (
        <Carousel pause='hover' className='bg-dark'>
            {products.map((product) =>(
 <Carousel.Item>
 <Link to ={`/product/${product._id}`}>
     <Image src={product.image} alt={product.name} fluid/>
     <Carousel.Caption className='carousel-caption'>
         <h3>
             {product.name} $: ({product.price})
         </h3>
     </Carousel.Caption>
 </Link>
</Carousel.Item>
            ))}
           

        </Carousel>
    )
}

export default ProductCarousel
