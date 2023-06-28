const mongoose = require('mongoose');
const {Schema,model} = mongoose;

const objectId  = Schema.Types.ObjectId;


// order  schema..
const order = new Schema(
    {
        productId:[{
            type:objectId,
            ref:'product',
            required: [true,"product id is require."]
        }],
        buyerId:{
            type:objectId,
            ref:'user-ragistar-data',
            required: [true,"user id is require."]
        },
        status:{
            type: String,
            default:'Not Processed',
            enum:[
                "Not Processed",
                "Processing",
                "Shipped",
                "Delivery",
                "canceled"
            ]
        }
    },
    {timestamps: true,versionKey: false}
);

// create a order Schema model..
const orderModel = model('order',order);

// export schema model...
module.exports = orderModel;