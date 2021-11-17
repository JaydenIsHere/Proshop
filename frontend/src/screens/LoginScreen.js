import React, { useState,useEffect }from 'react'
import {useDispatch,useSelector} from 'react-redux'
import FormConstainer from '../components/FormConstainer'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import{ Row,Col,Button, Form } from 'react-bootstrap'

import {Login} from '../actions/userAction'

const LoginScreen = ({location,history}) =>{
    const dispatch = useDispatch()

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const {loading , error , userInfo} = userLogin
    useEffect(() =>{
        if(userInfo)
        {
            history.push(redirect)
        }
    },[history,redirect,userInfo])

    const submitHandler = (e) =>{
        e.preventDefault()//prevent refresh
        dispatch(Login(email,password))//trigger action to send POST request
    }
  

   return <FormConstainer>
       <h1>Sign In</h1>
       {error && <Message variant='danger'>{error}</Message>}
     
       <Form onSubmit={submitHandler} className='mb-3'>
       <Form.Group controlId='email'>
           <Form.Label>Email address</Form.Label>
           <Form.Control type='email' placeholder='Enter Email' value={email} onChange={e => setEmail(e.target.value)}/>

          
       </Form.Group>
       <Form.Group controlId='password' >
           <Form.Label>Password</Form.Label>
           <Form.Control type='password' placeholder='Enter Password' value={password} onChange={e => setPassword(e.target.value)} className='mb-5'/>

       </Form.Group>
       <Button type='submit' variant='primary'>Sign In</Button>
       </Form>

       <Row className='py-3'>
           <Col>
           New To Here ? <Link to={redirect ? `/register?redirect=${redirect}` :'/register'}>Rigster</Link>
           </Col>
       </Row>
   </FormConstainer>

}

export default LoginScreen