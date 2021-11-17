import React, { useState,useEffect }from 'react'
import {useDispatch,useSelector} from 'react-redux'
import FormConstainer from '../components/FormConstainer'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import{ Row,Col,Button, Form } from 'react-bootstrap'
import {Register} from '../actions/userAction'

const RegisterScreen = ({location,history}) =>{
    const dispatch = useDispatch()
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [message,setMessage] = useState(null)
    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister)
    const { error , userInfo} = userRegister
    useEffect(() =>{
        if(userInfo)
        {
            history.push(redirect)
        }
    },[history,redirect,userInfo])

    const submitHandler = (e) =>{
        e.preventDefault()//prevent refresh
        if(password !== confirmPassword){
           setMessage('Password do not match')
        }else{
            dispatch(Register(name,email,password))//trigger action to send POST request
        }
        
    }
  

   return <FormConstainer>
       <h1>Sign Up</h1>
       {message && <Message variant='danger'>{message}</Message>}
       {error && <Message variant='danger'>{error}</Message>}
     
       <Form onSubmit={submitHandler} className='mb-3'>

       <Form.Group controlId='name'>
           <Form.Label>Name</Form.Label>
           <Form.Control type='name' placeholder='Enter Name' className='mb-3' value={name} onChange={e => setName(e.target.value)}/>
       </Form.Group>
       
       <Form.Group controlId='password' >
           <Form.Label>Password</Form.Label>
           <Form.Control type='password' placeholder='Enter Password' value={password} onChange={e => setPassword(e.target.value)} className='mb-3'/>
       </Form.Group>


       <Form.Group controlId='confirmPassword' >
           <Form.Label>Confirm Password</Form.Label>
           <Form.Control type='password' placeholder='Enter Confirm Password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className='mb-3'/>
       </Form.Group>

       <Form.Group controlId='email'>
           <Form.Label>Email address</Form.Label>
           <Form.Control type='email' placeholder='Enter Email' className='mb-3' value={email} onChange={e => setEmail(e.target.value)}/>
       </Form.Group>

       <Button type='submit' variant='primary'>Register</Button>
       </Form>

       <Row className='py-3'>
           <Col>
           Have an account ? <Link to={redirect ? `/login?redirect=${redirect}` :'/login'}>Login</Link>
           </Col>
       </Row>
   </FormConstainer>
}

export default RegisterScreen