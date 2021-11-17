import axios from 'axios'
import { ORDER_CREATE_REQUEST,ORDER_CREATE_SUCCESS,ORDER_CREATE_FAIL, ORDER_DETAILS_FAIL, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_REQUEST, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL, GET_MY_ORDERS_REQUEST, GET_MY_ORDERS_SUCCESS, GET_MY_ORDERS_FAIL, GET_ALL_ORDERS_REQUEST, GET_ALL_ORDERS_SUCCESS, GET_ALL_ORDERS_FAIL, ORDER_DELIVERED_REQUEST, ORDER_DELIVERED_SUCCESS, ORDER_DELIVERED_FAIL } from '../constants/orderConstant'
//action is set up what you going to do with data

export const createOrder = (order) => async (dispatch,getState) =>{
try{
dispatch({type:ORDER_CREATE_REQUEST})//say we are fetcing data
const{
    userLogin:{userInfo}
} = getState()
const config ={
    headers:{//because protect middleware for JWT
        'Content-Type':'application/json',
        Authorization:`Bearer ${userInfo.token}`
    }
}
const {data} = await axios.post('/api/orders',order,config)//processing
dispatch({
    type:ORDER_CREATE_SUCCESS,//say we got that data already 
    payload:data//pass down the payload into state
})
}catch(error){
    dispatch({
        type:ORDER_CREATE_FAIL,
        payload:error.response && error.response.data.message ? error.response.data.message : error.message
    })
}}

export const getOrderDetail = (id) => async (dispatch,getState) =>{
    try{
    dispatch({type:ORDER_DETAILS_REQUEST})//say we are fetcing data
    const{
        userLogin:{userInfo}
    } = getState()
    const config ={
        headers:{//because protect middleware for JWT
            Authorization:`Bearer ${userInfo.token}`
        }
    }
    const {data} = await axios.get(`/api/orders/${id}`,config)//processing
    dispatch({
        type:ORDER_DETAILS_SUCCESS,//say we got that data already 
        payload:data//pass down the payload into state
    })
    }catch(error){
        dispatch({
            type:ORDER_DETAILS_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }}

    export const payOrder = (orderId,paymentResult) => async (dispatch,getState) =>{
        try{
        dispatch({type:ORDER_PAY_REQUEST})//say we are fetcing data
        const{
            userLogin:{userInfo}
        } = getState()
        const config ={
            headers:{//because protect middleware for JWT
                'Content-Type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.put(`/api/orders/${orderId}/pay`,paymentResult,config)//processing
        dispatch({
            type:ORDER_PAY_SUCCESS,//say we got that data already 
            payload:data//pass down the payload into state
        })
        }catch(error){
            dispatch({
                type:ORDER_PAY_FAIL,
                payload:error.response && error.response.data.message ? error.response.data.message : error.message
            })
        }}

        export const getUserOrders = () => async (dispatch,getState) =>{
            try{
            dispatch({type:GET_MY_ORDERS_REQUEST})//say we are fetcing data
            const{
                userLogin:{userInfo}
            } = getState()
            const config ={
                headers:{//because protect middleware for JWT
                    Authorization:`Bearer ${userInfo.token}`
                }
            }
            const {data} = await axios.get(`/api/orders/myorders`,config)//processing
            dispatch({
                type:GET_MY_ORDERS_SUCCESS,//say we got that data already 
                payload:data//pass down the payload into state
            })
            }catch(error){
                dispatch({
                    type:GET_MY_ORDERS_FAIL,
                    payload:error.response && error.response.data.message ? error.response.data.message : error.message
                })
            }}

    export const getOrders = () => async (dispatch,getState) =>{
        try{
        dispatch({type:GET_ALL_ORDERS_REQUEST})//say we are fetcing data
        const{
             userLogin:{userInfo}
        } = getState()
                const config ={
            headers:{//because protect middleware for JWT
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get(`/api/orders`,config)//processing
        dispatch({
            type:GET_ALL_ORDERS_SUCCESS,//say we got that data already 
            payload:data//pass down the payload into state
        })
        }catch(error){
            dispatch({
                type:GET_ALL_ORDERS_FAIL,
                payload:error.response && error.response.data.message ? error.response.data.message : error.message
            })
        }}

        
    export const deliverOrder = (orderId) => async (dispatch,getState) =>{
        try{
        dispatch({type:ORDER_DELIVERED_REQUEST})//say we are fetcing data
        const{
            userLogin:{userInfo}
        } = getState()
        const config ={
            headers:{//because protect middleware for JWT
                'Content-Type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.put(`/api/orders/${orderId}/deliver`,{},config)//processing
        dispatch({
            type:ORDER_DELIVERED_SUCCESS,//say we got that data already 
            payload:data//pass down the payload into state
        })
        }catch(error){
            dispatch({
                type:ORDER_DELIVERED_FAIL,
                payload:error.response && error.response.data.message ? error.response.data.message : error.message
            })
        }}
