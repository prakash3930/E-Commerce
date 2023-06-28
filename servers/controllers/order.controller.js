const orderModel = require("../models/order.model");



// create a order by user..
exports.creatOrder = async(req,res)=>{
    try {
        // distucture user id and product id body.....
        const {productId,buyerId,status} = req.body;

        // order save a database ...
        const orderDetails = await new orderModel({productId,buyerId,status}).save();

   // user order respons sent....
   res.status(200).json({status:"successs",message:orderDetails});

    } catch (err) {
        res.status(200).json({status:"Fail",message:err.message});
    }
};

// get order by user.....
exports.getOrders = async(req,res)=>{
    try {
        // find buyer...in database.
        const orders = await orderModel.find({buyerId:req.User._id})
                       .populate('productId','-photo')
                       .populate('buyerId','name');

         // user order respons sent....
         res.status(200).json({status:"successs",message:orders});
    } catch (err) {
        res.status(200).json({status:"Fail",message:err.message});
    }
};

// get all order by admin..
exports.allOrder = async(req,res)=>{
    try {
         // find all order by admin...in database.
         const orders = await orderModel.find({})
         .populate('productId','-photo')
         .populate('buyerId','name');

        // user order respons sent....
        res.status(200).json({status:"successs",message:orders});

    } catch (err) {
        res.status(200).json({status:"Fail",message:err.message});
    }
};