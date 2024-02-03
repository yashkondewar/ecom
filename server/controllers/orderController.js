const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const asyncError = require("../middleWare/asyncError");
const Order = require("../models/orderModel");

// Creating Order
exports.createOrder = asyncError( async(req, res, next)=>{
    try {
        const {
            totalPrice,
            shippingPrice,
            taxPrice,
            shippingInfo,
            orderItems,
            // paidAt,
            itemPrice,
            paymentInfo,
        } = req.body

        const order = await Order.create({
            totalPrice,
            shippingPrice,
            taxPrice,
            shippingInfo,
            orderItems,
            // paidAt,
            itemPrice,
            paymentInfo,
            user: req.user._id,
            paidAt: Date.now(),
        })

        res.status(201).json({
            success: true,
            order
        })
    } catch (error) {
        res.status(201).json({
            success: false,
            error: error
        })
    }
})


//get single order  --ADMIN
exports.getSingleOrder = asyncError( async(req, res, next) => {
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email",
    )

    if(!order){
        return next(new ErrorHandler("No order Found", 404))
    }

    res.status(200).json({
        success: true,
        order
    })
})


// get user orders
exports.myOrders = asyncError( async(req, res, next) => {
    const orders = await Order.find({user: req.user._id})

    if(!orders){
        return next(new ErrorHandler("No order Found", 404))
    }

    res.status(200).json({
        success: true,
        orders
    })
})


// get all orders  --ADMIN
exports.getAllOrders = asyncError( async(req, res, next) => {
    const orders = await Order.find()

    if(!orders){
        return next(new ErrorHandler("No order Found", 404))
    }

    totalAmount = 0;
    orders.forEach((order)=>{
        totalAmount += order.totalPrice;
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
})


// Delete order --ADMIN
exports.deleteOrder = asyncError( async(req, res, next) => {
    const order = await Order.findById(req.params.id)

    if(!order){
        return next(new ErrorHandler("No order Found", 404))
    }

    await order.deleteOne()

    res.status(200).json({
        success: true,
    })
})

//Update Status  --ADMIN
exports.updateOrder = asyncError( async(req, res, next) => {
    const order = await Order.findById(req.params.id)
    // console.log(req.body.status)
    if(!order){
        return next(new ErrorHandler("No order Found", 404))
    }

    if(order.orderStatus === "delivered"){
        return next(new ErrorHandler("Order is already Delivered", 404))
    }

    order.orderItems.forEach(async (item)=> {await updateStock(item.product, item.quantity)})

    order.orderStatus = req.body.status;
    
    if(req.body.status === "delivered"){
        order.deliveredAt = Date.now();
    }

    await order.save({validateBeforeSave:false});

    res.status(200).json({
        success: true,
        order
    })
})



//functions
async function updateStock(id, quantity){
    const product = await Product.findById(id);

    product.Stock -= quantity;

    await product.save({validateBeforeSave:false});
}