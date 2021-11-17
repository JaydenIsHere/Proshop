import React, { useState,useEffect }from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import{ Form,Row,Col,Image,ListGroup,Card,Button} from 'react-bootstrap'
import { addToCart } from '../actions/cartAction'
import { listProductDetails,productCreateReview,productDeleteReview,productUpdateReview} from '../actions/productAction'//fire off this action(function)
import Rating from '../components/Rating'
import { PRODUCT_CREATE_REVIEW_RESET, PRODUCT_UPDATE_REVIEW_RESET} from '../constants/productConstant'
import Meta from '../components/Meta'

const ProductScreen = ({history,match}) => {
    const [qty,setQty] = useState(1)
    const [rating , setRating] = useState(1)
    const [comment , setComment] = useState('')
    const [edit , setEdit] = useState(false)
  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin//for verify the admin

  const productDetails = useSelector(state => state.productDetails)
  const {loading , error , product} = productDetails

  const productReviewCreate = useSelector(state => state.productReviewCreate)
  const {loading:loadingProductReview,error:reviewCreateError , success:reviewCreateSuccess} = productReviewCreate

  const productReviewDelete = useSelector(state => state.productReviewDelete)
  const {error:reviewDeleteError,success:reviewDeleteSuccess} = productReviewDelete

  const productReviewUpdate = useSelector(state => state.productReviewUpdate)
  const {error:reviewUpdateError,success:reviewUpdateSuccess} = productReviewUpdate

  


     useEffect(() =>{
         if (!product._id || product._id !== match.params.id || reviewCreateSuccess ||reviewDeleteSuccess || reviewUpdateSuccess){
            setRating(0)
            setComment('')
            dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
            dispatch({type:PRODUCT_UPDATE_REVIEW_RESET})
            dispatch(listProductDetails(match.params.id))   
         }
   
     },[dispatch,match,reviewCreateSuccess,reviewDeleteSuccess,product._id,reviewUpdateSuccess])
     
     const addToCartHandler = () => {
         dispatch(addToCart(product._id,qty))
        history.push(`/cart`)
	}
    const submitHandler =(e) =>{
        e.preventDefault()
    dispatch(productCreateReview(match.params.id, {
    rating,
    comment
}))
    }

 const removeReviewHandler =() =>{
  dispatch(productDeleteReview(match.params.id))  
    }

 const editReviewHandler= () =>{
    dispatch(productUpdateReview(match.params.id,{
    rating,
    comment
    }))
 }
 const toggler = () =>{
     edit ? setEdit(false) : setEdit(true)
 }

    return (
        <>
        <Link className="btn btn-light my-3" to="/">Go Back
        </Link>
        {loading ? <Loader/> : error ?<Message variant='danger'> {error} </Message>:(
            <>
            <Meta title ={product.name}/>
        <Row>
        <Col md={6}>
            <Image src={product.image} alt={product.name} fluid></Image>    
        </Col>
        <Col md={3}>
            <ListGroup variant = "flush">
                <ListGroup.Item >
                <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item >
                    <Rating 
                    value={product.rating} 
                    text={`${product.numReviews} reviews`}/>
                </ListGroup.Item >
                <ListGroup.Item>
                    ${product.price}
                </ListGroup.Item>
                <ListGroup.Item>
                   Description:{product.description}
                </ListGroup.Item>
            </ListGroup>
        </Col>
        <Col md={3}>
            <Card>
                 <ListGroup variant="flush">
                    <ListGroup.Item>
                        <Row>
                          <Col>
                          Price:
                          </Col>
                          <Col>
                          <strong>{product.price}</strong>
                          </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                          <Col>
                          Status:
                          </Col>
                          <Col>
                          <h4> {product.countInStock} </h4>piece availible
                          </Col>
                        </Row>
                    </ListGroup.Item>

                    {product.countInStock > 0 && 
                    <ListGroup.Item>
                        <Row>
                            <Col md={3}>Qty</Col>
                            <Col md={3}>
                            <button onClick ={()=> setQty(qty+ 1)}> + </button>
                            </Col>
                            <Col md={3}>
                            <input type="text" value={qty}  size="4"/>
                            </Col>
                            <Col md={3}>
                            <button onClick ={()=> setQty(qty- 1)}> - </button>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    }
                    <ListGroup.Item>
                      <Button 
                      onClick={addToCartHandler}
                      className="btn-block" 
                      type="button" 
                      disabled={product.countInStock === 0 || qty > product.countInStock || qty < 1}>
                      Add To Cart
                      </Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
    </Row>
    <Row>
<Col md={6}>
    <h2>Reviews</h2>
    {/* show reviews */}
    {product.reviews.length === 0 && <Message>No Reviews</Message>}
    {reviewDeleteError && <Message>{reviewDeleteError}</Message>}
    {reviewUpdateError && <Message>{reviewUpdateError}</Message>}
    <ListGroup variant='flush'>
        {product.reviews.map((review) =>(
            <ListGroup.Item key={review._id}>
<Row>
            <Col md={8}>
            <strong> {review.name}</strong>
            <Rating value={review.rating}/>
            <p>{review.createdAt.substring(0, 10)}</p>
            <p>{review.comment}</p>
            </Col>
            {userInfo && review.user === userInfo._id && (  
            <> 
            <Col>
            <Button type="button" variant="light" onClick={() =>{
                                removeReviewHandler()
                             }}><i className="fas fa-trash"></i></Button>

            <Button type="button" variant="light" onClick={toggler}><i className="fas fa-edit"></i></Button> 
             </Col>
             {edit && <Row>
   <Form onSubmit={editReviewHandler}>
   <Form.Group controlId='rating'>
       <Form.Label>Rating</Form.Label>
       <Form.Control 
       as="select" 
       value={rating} 
       onChange={(e) => setRating(e.target.value)}>
      
      <option value=''>Select...</option>
      <option value='1'>1- poor</option>
      <option value='2'>2- Fair</option>
      <option value='3'>3- Good</option>
      <option value='4'>4- Very Good</option>
      <option value='5'>5- Excellent</option>
    </Form.Control>

   </Form.Group>

   <Form.Group controlId='comment'>
       <Form.Label>Comment</Form.Label>
       <Form.Control 
       as="textarea"
       row='3' 
       value={comment} 
       onChange={(e) => setComment(e.target.value)}>

    </Form.Control>

   </Form.Group>
   <Button 
   disabled={loadingProductReview}
   type='submit'
   variant='primary mt-3'>
   Update     
   </Button>
   </Form>
   </Row>}
                
   </>
   )}
         
                
</Row>

            </ListGroup.Item>
         ) )}

            <ListGroup.Item >
 <h2>Write Reviews</h2>
{reviewCreateSuccess && (<Message>Review Submmited Successfully</Message>)}
{reviewCreateError && <Message variant='danger'>{reviewCreateError}</Message>}
            
{userInfo ? (
    <Form onSubmit={submitHandler}>
        <Form.Group controlId='rating'>
            <Form.Label>Rating</Form.Label>
            <Form.Control 
            as="select" 
            value={rating} 
            onChange={(e) => setRating(e.target.value)}>
           
           <option value=''>Select...</option>
           <option value='1'>1- poor</option>
           <option value='2'>2- Fair</option>
           <option value='3'>3- Good</option>
           <option value='4'>4- Very Good</option>
           <option value='5'>5- Excellent</option>
         </Form.Control>

        </Form.Group>

        <Form.Group controlId='comment'>
            <Form.Label>Comment</Form.Label>
            <Form.Control 
            as="textarea"
            row='3' 
            value={comment} 
            onChange={(e) => setComment(e.target.value)}>

         </Form.Control>

        </Form.Group>
        <Button 
        disabled={loadingProductReview}
        type='submit'
        variant='primary mt-3'>
        Submit     
        </Button>
        </Form>
) :(
    <Message>
        Please<Link to ='Login'>Sign In</Link> to write a review{' '}
    </Message>
)
}
</ListGroup.Item>
    </ListGroup>

    </Col>
    </Row>
    </>
    ) }
         </>
    )
}
export default ProductScreen
