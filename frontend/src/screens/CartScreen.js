import React from 'react'
import {Link} from 'react-router-dom'
import {useDispatch ,useSelector} from 'react-redux'
import {Row, Col ,ListGroup,Image,Button,Card} from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart,removeFromCart } from '../actions/cartAction'


const CartScreen = ({history,match}) => {
const dispatch = useDispatch()
const cart = useSelector(state => state.cart)
const {cartItems} = cart//pull out cartItems from cart

const removeFromCartHandler =(id) =>{
dispatch(removeFromCart(id))
}

const checkOuthandler =() =>{
  history.push('/login?redirect=shipping')
}


const updateQtyHandler = (id,qty,stock,action) =>{
    if(action === 'INC'){
        dispatch(addToCart( id , qty + (qty < stock ? 1: 0)))
        // dispatch(addToCart( id , qty + 1))
    }
    if(action === 'DEC'){
     dispatch(addToCart(id , qty - (qty > 1 ? 1 :0)))
    }
    }



    return (
        <Row>
        <Col md={8}>
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? <Message>Your Cart is empty <Link to='/'>Go Back</Link></Message> :(
                <ListGroup variant='flush'>
                    {cartItems.map(item =>(
                        <ListGroup.Item key ={item.product}>
                         <Row>
                             <Col md={2}>
                                 <Image src ={item.image} alt={item.name} fluid rounded/>
                             </Col>
                             <Col md={3}>
                             <Link to={`/product/${item.product}`}>{item.name}</Link>
                             </Col>
                             <Col me={1}>${item.price}</Col>
                             <Col md={3}>   

                             {/* <input type="number" value={item.qty}  id='qty'size="3" onChange={(e) =>dispatch(addToCart(item.product,Number(e.target.value)))}/> */}
                            <Button type='button'  variant="dark" size='sm'onClick ={() => updateQtyHandler(item.product,item.qty,item.countInStock,'INC')}> + </Button>
                            <input type="text" value={item.qty}  id='qty'size="1" />
                            <Button  type='button'   variant='dark' size='sm' onClick ={() => updateQtyHandler(item.product,item.qty,item.countInStock,'DEC')}> - </Button>
                          
                        
                           {/* <Form.Control as='select' value={item.qty} onChange={(e) =>dispatch(addToCart(item.product,Number(e.target.value)))}> 
                           { [...Array(item.countInStock).keys()].map((x) =>(//Array constructor
                             <option key={x+1} value={x+1}>{x+1}</option>
                           ))
                           }
                           </Form.Control> */}
                             </Col>
                             <Col md={2}> 
                             <Button type="button" variant="light" onClick={() =>{
                                 removeFromCartHandler(item.product)
                             }}><i className="fas fa-trash"></i></Button>
                             </Col>
                         </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>  
            )}
        </Col>
        <Col md={4}> 
        <Card>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h2>Subtotal ({cartItems.reduce((acc,item) => acc+item.qty,0)}) item</h2>
                    $Price {cartItems.reduce((acc,item) => acc+item.qty * item.price,0).toFixed(2)}
                </ListGroup.Item>
                <ListGroup.Item>
                    <Button type ="button" className="btn-block" disable={cartItems.length === 0} onClick = {checkOuthandler}>Proceed To Check Out</Button>
                </ListGroup.Item>
            </ListGroup>
        </Card>
        </Col>
        
        </Row>
    )
}
 
export default CartScreen