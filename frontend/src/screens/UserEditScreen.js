
import React, { useState,useEffect }from 'react'
import {useDispatch,useSelector} from 'react-redux'
import FormConstainer from '../components/FormConstainer'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import{ Button, Form } from 'react-bootstrap'
import {getUserDetails,updateUser} from '../actions/userAction'
import { USER_UPDATE_RESET } from '../constants/userConstant'
const UserEditScreen = ({match,history}) =>{
    const userId = match.params.id
    const dispatch = useDispatch()
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [isAdmin,setIsAdmin] = useState(false)

    const userDetails = useSelector(state => state.userDetails)
    const { error , user,loading} = userDetails

    
    const adminUserUpdate = useSelector(state => state.adminUserUpdate)
    const { success:successUpdate,error: errorUpdate, loading:loadingUpdate} = adminUserUpdate

    useEffect(() =>{
        if(successUpdate)//if updated
        {
            dispatch({type:USER_UPDATE_RESET})//reset
            history.push('/admin/userlist')
        }else{
            if(!user.name || user._id !== userId)//if user is not there
            {
                dispatch(getUserDetails(userId))//we get user
            }else{
                setName(user.name)//if not we set default value 
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }

    },[dispatch,userId,user,successUpdate,history])

    const submitHandler = (e) =>{
        e.preventDefault()//prevent refresh 
        dispatch(updateUser({
            _id:user._id,
            name,
            email,
            isAdmin
        }))
    }
  

   return (
    <>
    <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
    </Link>
    <FormConstainer>
       <h1>Edit User</h1>
      {loadingUpdate && <Loader/>}
      {errorUpdate && <Message>{errorUpdate}</Message>}
     {loading ? <Loader/> :error ? <Message varaint='danger'> {error}</Message> :(
         <Form onSubmit={submitHandler} className='mb-3'>

         <Form.Group controlId='name'>
             <Form.Label>Name</Form.Label>
             <Form.Control type='name' placeholder='Enter Name' className='mb-3' value={name} onChange={e => setName(e.target.value)}/>
         </Form.Group>

         <Form.Group controlId='email'>
             <Form.Label>Email address</Form.Label>
             <Form.Control type='email' placeholder='Enter Email' className='mb-3' value={email} onChange={e => setEmail(e.target.value)}/>
         </Form.Group>
  
         <Form.Group controlId='isadmin' >
             <Form.Label>Is Admin</Form.Label>
             <Form.Check type='checkbox' 
              checked={isAdmin} onChange={e => setIsAdmin(e.target.checked)} className='mb-3'/>
         </Form.Group>

         <Button type='submit' variant='primary'>Update</Button>
         </Form>
     )}    
   </FormConstainer>
    </>
   
   )
}

export default UserEditScreen