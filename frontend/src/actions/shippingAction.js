import { CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstant";

 
export const saveShippingAddress = (data) =>(dispatch) =>{
    dispatch ({
      type: CART_SAVE_SHIPPING_ADDRESS,
      payload:data
    })
    localStorage.setItem('shippingAddress',JSON.stringify(data))
  }