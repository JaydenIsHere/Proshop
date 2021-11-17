import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_RESET,
    ORDER_PAY_FAIL,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_REQUEST,
    GET_MY_ORDERS_REQUEST,
    GET_MY_ORDERS_SUCCESS,
    GET_MY_ORDERS_FAIL,
    GET_MY_ORDERS_RESET,
    GET_ALL_ORDERS_REQUEST,
    GET_ALL_ORDERS_SUCCESS,
    GET_ALL_ORDERS_FAIL,
    ORDER_DELIVERED_REQUEST,
    ORDER_DELIVERED_SUCCESS,
    ORDER_DELIVERED_FAIL,
    ORDER_DELIVERED_RESET,
} from '../constants/orderConstant'

//reducer help action put that payload into state
export const orderCreateReducer = (state={},action) =>{
switch(action.type){//producer for product list
   case ORDER_CREATE_REQUEST:
       return {loading:true}//fetching data
   case ORDER_CREATE_SUCCESS:   
       return {
           loading: false, 
           order:action.payload,
           success:true
        }//success means done the request,payload goes in state
   case ORDER_CREATE_FAIL:
       return {loading:false, error:action.payload}
       default :
       return state
}
}

//you are recieving the data so you need ...state
export const orderDetailsReducer = (state={loading:true,orderItems:[],shippingAddress:{}},action) =>{
    switch(action.type){
       case ORDER_DETAILS_REQUEST:
           return {
            ...state,
            loading:true  
        }//fetching data

       case ORDER_DETAILS_SUCCESS:   
           return {        
               loading: false, 
               order:action.payload,
            }
       case  ORDER_DETAILS_FAIL:
           return {loading:false, error:action.payload}
           default :
           return state
    }
    }

    export const orderPayReducer = (state={},action) =>{
        switch(action.type){
           case ORDER_PAY_REQUEST:
               return {
                loading:true  
            }//fetching data
    
           case ORDER_PAY_SUCCESS:   
               return {        
                   loading: false, 
                   success:true,
                }
           case  ORDER_PAY_FAIL:
               return {loading:false, error:action.payload}
            case  ORDER_PAY_RESET:
                return {}
               default :
               return state
        }
        }
    
        export const getMyOrdersReducer = (state={orders:[]},action) =>{
            switch(action.type){
               case GET_MY_ORDERS_REQUEST:
                   return {
                    loading:true  }
        
               case GET_MY_ORDERS_SUCCESS:   
                   return {        
                       loading: false, 
                       orders:action.payload,
                    }
               case  GET_MY_ORDERS_FAIL:
                   return {loading:false, error:action.payload}
                case  GET_MY_ORDERS_RESET:
                    return {orders:[]}
                   default :
                   return state
            }
            }
            export const getAllOrdersReducer = (state={orders:[]},action) =>{
                switch(action.type){
                   case GET_ALL_ORDERS_REQUEST:
                       return {
                        loading:true  }
            
                   case GET_ALL_ORDERS_SUCCESS:   
                       return {        
                           loading: false, 
                           orders:action.payload,
                        }
                   case  GET_ALL_ORDERS_FAIL:
                       return {loading:false, error:action.payload}
                       default :
                       return state
                }
                }
                export const orderDeliverReducer = (state={},action) =>{
                    switch(action.type){
                       case ORDER_DELIVERED_REQUEST:
                           return {
                            loading:true  
                        }//fetching data
                
                       case ORDER_DELIVERED_SUCCESS:   
                           return {        
                               loading: false, 
                               success:true,
                            }
                       case  ORDER_DELIVERED_FAIL:
                           return {loading:false, error:action.payload}
                        case  ORDER_DELIVERED_RESET:
                            return {}
                           default :
                           return state
                    }
                    }