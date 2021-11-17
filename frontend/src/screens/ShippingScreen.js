import React, { useState}from 'react'
import {useDispatch,useSelector} from 'react-redux'
import FormConstainer from '../components/FormConstainer'
import{ Button, Form } from 'react-bootstrap'
import { saveShippingAddress } from '../actions/shippingAction' 
import CheckoutStep from '../components/CheckoutStep'

const ShippingScreen = ({history}) => {//desturcture props
const dispatch = useDispatch()
const shipping = useSelector(state =>state.shipping)
const {shippingAddress} = shipping

    const [address,setAddress] = useState(shippingAddress.address)
    const [city,setCity] = useState(shippingAddress.city)
    const [postalCode,setPostalCode] = useState(shippingAddress.postalCode)
    const [country,setCountry] = useState(shippingAddress.country)

    const submitHandler = (e) =>{
      e.preventDefault()
     dispatch(saveShippingAddress({address,city,postalCode,country}))
     history.push('/payment')
    }
    return (
       
        <div>
       
            <FormConstainer>
            <CheckoutStep step1 step2/>
                <h1>Shipping</h1>
                <Form onSubmit={submitHandler}>

                <Form.Group controlId='address'>
           <Form.Label>Address</Form.Label>
           <Form.Control type='text' placeholder='Enter Address' className='mb-3' value={address} required onChange={e => setAddress(e.target.value)}/>
       </Form.Group>

       <Form.Group controlId='city'>
           <Form.Label>City</Form.Label>
           <Form.Control type='text' placeholder='Enter City' className='mb-3' value={city} required onChange={e => setCity(e.target.value)}/>
       </Form.Group>
       
       <Form.Group controlId='postalCode'>
           <Form.Label>PostalCode</Form.Label>
           <Form.Control type='text' placeholder='Enter PostalCode' className='mb-3' value={postalCode} required onChange={e => setPostalCode(e.target.value)}/>
       </Form.Group>
       
       <Form.Group controlId='country'>
           <Form.Label>Country</Form.Label>
           <Form.Control type='text' placeholder='Enter Country' className='mb-3' value={country} required onChange={e => setCountry(e.target.value)}/>
       </Form.Group>
       
       <Button type="submit" varient="primary"> Continue </Button>
                </Form>
            </FormConstainer>
        </div>
    )
}

export default ShippingScreen
