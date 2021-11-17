import React, { useState}from 'react'
import {useDispatch,useSelector} from 'react-redux'
import FormConstainer from '../components/FormConstainer'
import{ Button, Form ,Col} from 'react-bootstrap'
import { savePaymentMethod } from '../actions/cartAction'
import CheckoutStep from '../components/CheckoutStep'

const PaymentScreen = ({history}) => {//desturcture props
const dispatch = useDispatch()
const shipping = useSelector(state =>state.shipping)
const {shippingAddress} = shipping

if(!shippingAddress){
    history.push('/shipping')
}

    const [paymentMethod,setPaymentMethod] = useState('PayPal')
 

    const submitHandler = (e) =>{
      e.preventDefault()
     dispatch(savePaymentMethod(paymentMethod))
     history.push('/placeorder')
    }
    return (
       
        <div>
       
            <FormConstainer>
            <CheckoutStep step1 step2 step3/>
                <h1>Payment Method</h1>
                <Form onSubmit={submitHandler}>
<Form.Group>
    <Form.Label as ="legend">Select Method</Form.Label>
               <Col>
               <Form.Check 
               type="radio" 
               label="PayPal or Creadit Card" 
               id="PayPal" 
               name="paymentMethod" 
               value="PayPal" 
               checked 
               onChange={(e) => setPaymentMethod(e.target.value)}>
               </Form.Check>
               </Col>
               <Col>
               <Form.Check type="radio" 
               label="Stripe" 
               id="Stripe" 
               name="paymentMethod" 
               value="Stripe" 
               onChange={(e) => setPaymentMethod(e.target.value)}>
               </Form.Check>
               </Col>
               </Form.Group>


       <Button type="submit" varient="primary"> Continue </Button>

                </Form>
</FormConstainer>
        </div>
    )
}
export default PaymentScreen
