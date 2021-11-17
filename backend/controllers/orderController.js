
import asyncHandler from 'express-async-handler'
import Order from '../model/orderModel.js'
// Create new order
// POST /api/orders
//private
const addOerderItems = asyncHandler(async (req,res)  =>{
    const {//from the placeOrder
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
} = req.body
if(orderItems && orderItems.length === 0 )
{
res.status(400)
throw new Error('No order item')
return 
}else{
    const order = new Order(//protected route need to get id
        {
            orderItems,
            user:req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        }
    )
 const createOrder = await order.save()
 res.status(201).json(createOrder)
}
    
})

// get order by ID
// GET /api/orders/:id
//private
const getOrderById = asyncHandler(async (req,res)  =>{
   
const order = await Order.findById(req.params.id).populate('user','name email')//indicate the data we want

if(order)
{
    res.json(order)
}else{
    res.status(404)
throw new Error('No item found')
}
    
})

// update order to paid
// PUT /api/orders/:id/pay
//private
const updateOrderToPaid = asyncHandler(async (req,res)  =>{
   
    const order = await Order.findById(req.params.id)
    
    if(order)
    {
      order.isPaid = true,
      order.paidAt = Date.now(),
      order.paymentResult = { //come from paypal
      id: req.body.id,
       status: req.body.status,
       update_time:req.body.update_time,
       email_address:req.body.payer.email_address
      }

      const updatedOrder = await order.save()
      res.json(updatedOrder)
    }else{
        res.status(404)
    throw new Error('Order item found')
    }
        
    })


    // get loggd in user orders
    // GET /api/orders/myorders
    //private
const getMyOrder= asyncHandler(async (req,res)  =>{
   
    const orders = await Order.find({user:req.user._id})
    
    if(orders)
    {
     res.json(orders)
    }else{
        res.status(404)
    throw new Error('Order item found')
    }
        
    })

        // get all orders
    // GET /api/orders
    //private/admin
const getAllOrders= asyncHandler(async (req,res)  =>{
   
    const orders = await Order.find({}).populate('user','id name')
        res.json(orders)
    })
    
// update order to delivered
// PUT /api/orders/:id/delivered
//private/admin
const updateOrderToDelivered = asyncHandler(async (req,res)  =>{
   
    const order = await Order.findById(req.params.id)
    
    if(order)
    {
      order.isDelivered = true,
      order.deliveredAt = Date.now()
      const updatedOrder = await order.save()
      res.json(updatedOrder)
    }else{
        res.status(404)
    throw new Error('Order item found')
    }
        
    })

export{addOerderItems,
    getOrderById, 
    updateOrderToPaid,
    getMyOrder,
    getAllOrders,
    updateOrderToDelivered
}