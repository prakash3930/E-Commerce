const mongoose = require('mongoose');
const {Schema,model} = mongoose;

// user registration data schema..
const userRegistar = new Schema(
    {
        name:{
            type: String,
            trim: true,
            required: [true,"Name is require."],
            minLength: [3,"min length 3 word."],
            maxLength: [25,"min length 25 word."]
        },
        email:{
            type: String,
            trim: true,
            unique: true,
            required: [true,"email is require."],
            email: true
        },
        password:{
            type: String,
            trim: true,
            required: [true,"password is require."],
            minLength: [8,"min length 8 charactar."]
        },
        role:{
            type: String,
            trim: true,
            default:0
        }
    },
    {timestamps: true,versionKey: false}
);

// create a Schema model..
const registerModel = model('user-ragistar-data',userRegistar);

// export schema model...
module.exports = registerModel;