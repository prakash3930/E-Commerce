const mongoose = require('mongoose');
const {Schema,model} = mongoose;

// product catagory schema..
const catagory = new Schema(
    {
        name:{
            type: String,
            trim: true,
            required: [true,"Name is require."],
            minLength: [3,"min length 3 word."],
            maxLength: [32,"min length 32 word."],
            unique: true
        },
        slug:{
            type: String,
            trim: true,
            unique: true
        }
    },
    {timestamps: true,versionKey: false}
);

// create a product catagory Schema model..
const categoryModel = model('category-product',catagory);

// export schema model...
module.exports = categoryModel;