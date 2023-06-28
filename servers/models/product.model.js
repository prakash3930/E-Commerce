const mongoose = require('mongoose');
const {Schema,model} = mongoose;

const objectId  = Schema.Types.ObjectId;


// product  schema..
const product = new Schema(
    {
        name:{
            type: String,
            trim: true,
            required: [true,"Name is require."],
            minLength: [5,"min length 5 word."],
            maxLength: [60,"min length 60 word."],
            unique: true
        },
        slug:{
            type: String,
            trim: true,
            unique: true
        },
        description:{
            type: String,
            trim: true,
            required: [true,"description is require."],
            minLength: [5,"min length 5 word."],
            maxLength: [1600,"min length 1600 word."],
        },
        price:{
            type: Number,
            trim: true,
            required: [true,"price is require."]
        },
        category:{
            type: objectId,
            ref:"category-product",
            trim: true,
            required: [true,"category is require."]
        },
        sold:{
            type: Number,
            trim: true,
            default: 0
        },
        photo:{
            contentType: String,
            data: Buffer
        },
        shipping:{
            type: Boolean,
            required: false
        }
    },
    {timestamps: true,versionKey: false}
);

// create a product Schema model..
const productModel = model('product',product);

// export schema model...
module.exports = productModel;