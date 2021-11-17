//set up redux
import { createStore, combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { productListReducer, productDetailsReducer,productDeleteReducer,productCreateReducer,productUpdateReducer,productReviewCreateReducer,productReviewDeleteReducer,productReviewUpdateReducer,productTopRatedReducer} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { userLoginReducer , userRegisterReducer,userDetailsReducer,userUpdateReducer,userListReducer,userDeleteReducer,adminUserUpdateReducer} from './reducers/userReducers'
import { shippingReducer } from './reducers/shippingReducer'
import { orderCreateReducer,orderDetailsReducer,orderPayReducer,getMyOrdersReducer,getAllOrdersReducer,orderDeliverReducer} from './reducers/orderReducer'
//the actual real data goes in combineReducers
const reducer = combineReducers({
productList : productListReducer,
productDetails: productDetailsReducer,
productDelete: productDeleteReducer,
productCreate: productCreateReducer,
productUpdate: productUpdateReducer,
productReviewCreate: productReviewCreateReducer,
productReviewDelete: productReviewDeleteReducer,
productReviewUpdate: productReviewUpdateReducer,
productTopRated: productTopRatedReducer,
cart:cartReducer,
shipping:shippingReducer,
userLogin:userLoginReducer,
userRegister: userRegisterReducer,
userDetails: userDetailsReducer,
userUpdateProfile:userUpdateReducer,
userList:userListReducer,
userDelete:userDeleteReducer,
adminUserUpdate:adminUserUpdateReducer,
orderCreate:orderCreateReducer,
orderDetails:orderDetailsReducer,
orderPay:orderPayReducer,
orderDeliver:orderDeliverReducer,
getMyOrders:getMyOrdersReducer,
getAllOrders:getAllOrdersReducer,

})
const cartItemsFromStorage = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: []
    
	const userInfoStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null
    
	const shippingFromStorage = localStorage.getItem('shippingAddress')
	? JSON.parse(localStorage.getItem('shippingAddress'))
	: {}
    
	const paymentMethodFromStorage = localStorage.getItem('paymentMethod') 
	? JSON.parse(localStorage.getItem('paymentMethod'))  : ''

const initialState = {
   cart: {
	cartItems: cartItemsFromStorage,
	paymentMethod:paymentMethodFromStorage
   },
   shipping:{
	shippingAddress:shippingFromStorage,
   },
   userLogin:{
	   userInfo:userInfoStorage
   },


}
const middleware = [thunk]
const store = createStore(reducer,initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store