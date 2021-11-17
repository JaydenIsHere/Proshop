import React, { useState,useEffect }from 'react'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import{ Row,Col,Button, Form } from 'react-bootstrap'
import {getUserDetails,updateUserProfile} from '../actions/userAction'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstant'
import { getUserOrders } from '../actions/orderAction'
import{Table} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../components/Loader'
const ProfileScreen = ({history}) =>{
    const dispatch = useDispatch()
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [message,setMessage] = useState(null)
    const [profileUpdate,setProfileUpdate] = useState(false)

    const userDetails = useSelector(state => state.userDetails)
    const {error , user} = userDetails
    
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)//I jsut want to show success message
    const{success} = userUpdateProfile
    
    const getMyOrders = useSelector(state => state.getMyOrders)
    const {orders,error:errorOrders,loading:loadingOrders} = getMyOrders
    useEffect(() =>{
        if(!userInfo)//if there's no this user
        {
            history.push('/Login')
        }else{
            if(!user || !user.name || success){//if there's no user fill in 
                dispatch({type:USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
                dispatch(getUserOrders())
                if(success)
                {
                    setProfileUpdate(true)
                }
            }
            else{//if have user then we set that user info
                setName(user.name)
                setEmail(user.email)
            }
        }
    },[dispatch,history,userInfo,user,success])
    
    const submitHandler = (e) =>{
        e.preventDefault()//prevent refresh
       
          //get rid of previous message
    setProfileUpdate(false)
    setMessage(null)
        if(password !== confirmPassword){
           setMessage('Password do not match')
        }else{
          dispatch(updateUserProfile(
              {id: user._id,
                name,
                email,
                password           
            }))
        }
    }
  
  return <Row> 
          <Col md={3}>
         <h2>My Detail</h2>
       {message && <Message variant='danger'>{message}</Message>}
       {error && <Message variant='danger'>{error}</Message>}
       {profileUpdate && <Message variant='success'>User Profile Updated</Message>}
     
       <Form onSubmit={submitHandler} className='mb-3'>

       <Form.Group controlId='name'>
           <Form.Label>Name</Form.Label>
           <Form.Control type='name' placeholder='Enter Name' className='mb-3' value={name} onChange={e => setName(e.target.value)}/>
       </Form.Group>
       
       <Form.Group controlId='email'>
           <Form.Label>Email address</Form.Label>
           <Form.Control type='email' placeholder='Enter Email' className='mb-3' value={email} onChange={e => setEmail(e.target.value)}/>
       </Form.Group>

       <Form.Group controlId='password' >
           <Form.Label>Password</Form.Label>
           <Form.Control type='password' placeholder='Enter Password' value={password} onChange={e => setPassword(e.target.value)} className='mb-3'/>
       </Form.Group>

       <Form.Group controlId='confirmPassword' >
           <Form.Label>Confirm Password</Form.Label>
           <Form.Control type='password' placeholder='Enter Confirm Password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className='mb-3'/>
       </Form.Group>

       <Button type='submit' variant='primary'>Update</Button>
       </Form>
          </Col>
          <Col md={9}>

              <h2>My Order</h2>
              {loadingOrders ? (<Loader/>) : errorOrders ? (<Message variant='danger'>{errorOrders}</Message>) :(
            <Table striped bordered hover responsive className="table-sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>
                        <th></th>
                   </tr>
                </thead>
                   <tbody>
                       {orders.map((order) =>(
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.createdAt.substring(0,10)}</td>
                            <td>{order.totalPrice}</td>
                            <td>
                                {order.isPaid ? (order.paidAt.substring(0,10) )
                                : (<i className='fas fa-times' style={{color:'red'}}></i>)}
                            </td>
                            <td>
                                {order.isDelivered ? ( order.deliveredAt.substring(0,10) )
                                : (<i className='fas fa-times' style={{color:'red'}}></i>)}
                            </td>
                            <td>
                                <LinkContainer to={`/order/${order._id}`}>
                                <Button className='btn-sm' variant='light'> Details</Button>
                                </LinkContainer>
                            </td>
                        </tr>

                       ))}
                   </tbody>         
            </Table>
                )}
          </Col>
      </Row>
      
}

export default ProfileScreen