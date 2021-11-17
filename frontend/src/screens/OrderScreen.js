import React, { useEffect,useState }from 'react'
import { useDispatch,useSelector } from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom'
import{ Button,Row,Col,ListGroup,Image } from 'react-bootstrap'
import Message from '../components/Message'
import { payOrder,getOrderDetail,deliverOrder } from '../actions/orderAction'
import Loader from '../components/Loader'
import {PayPalButton} from 'react-paypal-button-v2'
import { ORDER_PAY_RESET ,ORDER_DELIVERED_RESET} from '../constants/orderConstant'



const OrderScreen = ({match, history}) => {

const orderId =  match.params.id
const dispatch = useDispatch()
const[sdkReady,setSdkReady] = useState(false)

const orderDetail = useSelector(state =>state.orderDetails)
const {error,order,loading} = orderDetail

const orderPay = useSelector(state =>state.orderPay)
const {success:successPay,loading:loadingPay} = orderPay

const orderDeliver = useSelector(state =>state.orderDeliver)
const {success:successDeliver} = orderDeliver

const userLogin = useSelector(state =>state.userLogin)
const {userInfo} = userLogin

    useEffect(() =>{
        //Add paypal Script
const addPayPalScript = async () =>{
    const {data:clientId} = await axios.get('/api/config/paypal')//hit route get paypal client Id
    const script = document.createElement('script')//create paypal script
    script.type = 'text/javascript'
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`//from paypal sdk script
    script.async = true
    //if we set the sdk ready
    script.onload =() =>{
        setSdkReady(true)
    }
    document.body.appendChild(script)
}


//Check payment condition and display payment detail

if(!userInfo){
    history.push('/login')
}
        if(!order || successPay || successDeliver || order._id !== orderId )
        {
            dispatch({type:ORDER_PAY_RESET})//reset before next transaction,prevent loop
            dispatch({type:ORDER_DELIVERED_RESET})
            dispatch(getOrderDetail(orderId))
        }else if(!order.isPaid){//not pay ask them to pay
            if(!window.paypal)
            {
                addPayPalScript()
            }else{
                setSdkReady(true)//if it's paid then set paid
            }
        }
  
    },[dispatch,orderId,order,successPay,successDeliver])

    
//update the order detail after paid
       const successPaymentHandler =(paymentResult) =>{//paymentResult is what we get back from paypal
     dispatch(payOrder(orderId,paymentResult))
         }

         const successDeliverHandler =() =>{
            dispatch(deliverOrder(orderId))
         }

         return loading ? <Loader/> : error ? <Message variant="danger">{error}</Message> :<>
         <h1>Order {order._id}</h1>
 
         <Row>
        <Col md={8}>
            <ListGroup variant="flush">

            <ListGroup.Item>
                <h2>Shipping</h2>
              <p> <strong>Name :</strong>{order.user.name}</p> 
              <p> <strong>Email :</strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p> 

                <p>        
                    <strong>Shipping Address: </strong>
                    {order.shippingAddress.address}/ 
                    {order.shippingAddress.city}/ 
                    {order.shippingAddress.postalCode}/ 
                    {order.shippingAddress.country}
                </p>
                {order.isDelivered ? <Message variant='success'>Delivered On {order.deliveredAt}</Message> : <Message variant="danger">Not Delivered </Message>}
            </ListGroup.Item>
             
          
             
   
            <ListGroup.Item>
                    <h2>Payment method</h2>
                    <p>
                    <strong>Method: </strong>
                    {order.paymentMethod}
                    </p>
                    {order.isPaid ? (<Message variant='success'>Paid On {order.paidAt}</Message>) : (<Message variant="danger">Not Paid </Message>)}
            </ListGroup.Item>
     

         
                <ListGroup.Item>
                    <h2>Order Items</h2>
         {order.orderItems.length === 0 ? (<Message>Order is empty</Message>) : (
             <ListGroup>
               <ListGroup.Item>
                {order.orderItems.map(item => (
                 <ListGroup variant="flush">
                   <ListGroup.Item key={item.product}>
                     <Row>
                     <Col md={1}>
                     <Image src={item.image} alt={item.name} rounded fluid ></Image>
                     </Col>
                     <Col>
                     <Link to={`/product/${item.product}`}>{item.name}</Link>
                     </Col>
                     <Col md={4}>
                     {item.qty} x {item.price} = ${item.qty * item.price}
                    </Col>
                 </Row>           
                    </ListGroup.Item>
                </ListGroup>
              ))}
            </ListGroup.Item>
                </ListGroup>
             )}
           </ListGroup.Item>
           </ListGroup>
     </Col>

                <Col md={4}>
                    <ListGroup variant="flush">

                        <ListGroup.Item>
                    <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items </Col>
                                <Col>${order.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>${order.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>${order.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>${order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered &&(
                             <ListGroup.Item>
                          <Button variant='dark' onClick={successDeliverHandler}>
                          Confirm Delivered
                          </Button>
                         </ListGroup.Item>
                        )}
                       {!order.isPaid && (
                           <ListGroup.Item>
                               {loadingPay && <Loader/>}
                               {!sdkReady ? (<Loader/>) :(
                                <PayPalButton
                                amount={order.totalPrice}
                                onSuccess={successPaymentHandler}
                                />
                               )}
                            </ListGroup.Item>
                       )}
                    </ListGroup>
                </Col>
            </Row>
    </>
}
export default OrderScreen
