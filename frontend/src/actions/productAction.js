import axios from 'axios'
import { PRODUCT_LIST_REQUEST , PRODUCT_LIST_SUCCESS , PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_SUCCESS, PRODUCT_CREATE_REVIEW_FAIL, PRODUCT_DELETE_REVIEW_REQUEST, PRODUCT_DELETE_REVIEW_SUCCESS, PRODUCT_DELETE_REVIEW_FAIL, PRODUCT_UPDATE_REVIEW_REQUEST, PRODUCT_UPDATE_REVIEW_SUCCESS, PRODUCT_UPDATE_REVIEW_FAIL, PRODUCT_TOP_REQUEST, PRODUCT_TOP_SUCCESS, PRODUCT_TOP_FAIL } from '../constants/productConstant'

//action is set up what you going to do with data
export const listProduct = (keyword='',pageNumber='') => async (dispatch) =>{
try{
dispatch({type:PRODUCT_LIST_REQUEST})//say we are fetcing data

const {data} = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`)//processing

dispatch({
    type:PRODUCT_LIST_SUCCESS,//say we got that data already 
    payload:data//pass down data to payload 
})
}catch(error){
dispatch({
    type:PRODUCT_LIST_FAIL,
    payload:error.response && error.response.data.message ? error.response.data.message : error.message
    //generic error message.&& backend error message
})
}}

export const listProductDetails = (id) => async (dispatch) =>{
    try{
    dispatch({type:PRODUCT_DETAILS_REQUEST})//say we are fetcing data
    
    const {data} = await axios.get(`/api/products/${id}`)//processing
    
    dispatch({
        type:PRODUCT_DETAILS_SUCCESS,//say we got that data already 
        payload:data,//pass down the single product into state
    })
    }catch(error){
    dispatch({
        type:PRODUCT_DETAILS_FAIL,
        payload:error.response && error.response.data.message ? error.response.data.message : error.message
        //generic error message.&& backend error message
    })
    }
}

export const listproductDelete = (id) => async (dispatch,getState) =>{
    try{
    dispatch({type:PRODUCT_DELETE_REQUEST})//say we are fetcing data
    const {userLogin:{userInfo}} = getState()
    const config ={
        headers:{//because protect middleware for JWT
            Authorization:`Bearer ${userInfo.token}`
        }
    }
    await axios.delete(`/api/products/${id}`,config)//processing
    
    dispatch({
        type:PRODUCT_DELETE_SUCCESS,//say we got that data already 
    })
    }catch(error){
    dispatch({
        type:PRODUCT_DELETE_FAIL,
        payload:error.response && error.response.data.message ? error.response.data.message : error.message
        //generic error message.&& backend error message
    })
    }
}

export const listproductCreate = () => async (dispatch,getState) =>{
    try{
    dispatch({type:PRODUCT_CREATE_REQUEST})//say we are fetcing data
    const {userLogin:{userInfo}} = getState()
    const config ={
        headers:{//because protect middleware for JWT
            Authorization:`Bearer ${userInfo.token}`
        }
    }
   const { data } =  await axios.post(`/api/products`,{},config)//processing
    
    dispatch({
        type:PRODUCT_CREATE_SUCCESS,//say we got that data already 
        payload:data
    })
    }catch(error){
    dispatch({
        type:PRODUCT_CREATE_FAIL,
        payload:error.response && error.response.data.message ? error.response.data.message : error.message
        //generic error message.&& backend error message
    })
    }
}

export const listproductUpdate = (product) => async (dispatch,getState) =>{
    try{
    dispatch({type:PRODUCT_UPDATE_REQUEST})//say we are fetcing data
    const {userLogin:{userInfo}} = getState()
    const config ={
        headers:{//because protect middleware for JWT
            'Content-Type':'application/json', 
            Authorization:`Bearer ${userInfo.token}`
        }
    }
   const { data } =  await axios.put(`/api/products/${product._id}`,product,config)//processing
    
    dispatch({
        type:PRODUCT_UPDATE_SUCCESS,//say we got that data already 
        payload:data
    })
    }catch(error){
    dispatch({
        type:PRODUCT_UPDATE_FAIL,
        payload:error.response && error.response.data.message ? error.response.data.message : error.message
        //generic error message.&& backend error message
    })
    }
}

export const productCreateReview = (productId,review) => async (dispatch,getState) =>{
    try{
    dispatch({type:PRODUCT_CREATE_REVIEW_REQUEST})//say we are fetcing data
    const {userLogin:{userInfo}} = getState()
    const config ={
        headers:{//because protect middleware for JWT
            'Content-Type':'application/json', 
            Authorization:`Bearer ${userInfo.token}`
        }
    }
   await axios.post(`/api/products/${productId}/reviews`,review,config)//processing
    
    dispatch({
        type:PRODUCT_CREATE_REVIEW_SUCCESS,//say we got that data already 
    })
    }catch(error){
    dispatch({
        type:PRODUCT_CREATE_REVIEW_FAIL,
        payload:error.response && error.response.data.message ? error.response.data.message : error.message
        //generic error message.&& backend error message
    })
    }
}

export const productDeleteReview = (productId) => async (dispatch,getState) =>{
    try{
    dispatch({type:PRODUCT_DELETE_REVIEW_REQUEST})//say we are fetcing data
    const {userLogin:{userInfo}} = getState()
    const config ={
        headers:{//because protect middleware for JWT
            Authorization:`Bearer ${userInfo.token}`
        }
    }
   await axios.delete(`/api/products/${productId}/reviews`,config)//processing
    
    dispatch({
        type:PRODUCT_DELETE_REVIEW_SUCCESS,//say we got that data already 
    })
    }catch(error){
    dispatch({
        type:PRODUCT_DELETE_REVIEW_FAIL,
        payload:error.response && error.response.data.message ? error.response.data.message : error.message
        //generic error message.&& backend error message
    })
    }
}

export const productUpdateReview = (productId,review) => async (dispatch,getState) =>{
    try{
    dispatch({type:PRODUCT_UPDATE_REVIEW_REQUEST})//say we are fetcing data
    const {userLogin:{userInfo}} = getState()
    const config ={
        headers:{//because protect middleware for JWT
            'Content-Type':'application/json', 
            Authorization:`Bearer ${userInfo.token}`
        }
    }
   await axios.put(`/api/products/${productId}/reviews`,review,config)//processing
    
    dispatch({
        type:PRODUCT_UPDATE_REVIEW_SUCCESS,//say we got that data already 
    })
    }catch(error){
    dispatch({
        type:PRODUCT_UPDATE_REVIEW_FAIL,
        payload:error.response && error.response.data.message ? error.response.data.message : error.message
        //generic error message.&& backend error message
    })
    }
}

export const productTop = () => async (dispatch) =>{
    try{
    dispatch({type:PRODUCT_TOP_REQUEST})//say we are fetcing data
    const config ={
        headers:{//because protect middleware for JWT
            'Content-Type':'application/json'    
        }
    }
  const {data} = await axios.get(`/api/products/top`,config)//processing
    
    dispatch({
        type:PRODUCT_TOP_SUCCESS,
        payload:data

    })
    }catch(error){
    dispatch({
        type:PRODUCT_TOP_FAIL,
        payload:error.response && error.response.data.message ? error.response.data.message : error.message
        //generic error message.&& backend error message
    })
    }
}