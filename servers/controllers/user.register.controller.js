const { passwordBcrypt, hashPasswordCompar } = require("../configs/user.registrationPassword.bcrypt");
const registerModel = require("../models/user.registration.model");
const jwt = require('jsonwebtoken');


// register section ....


exports.register = async(req,res)=>{
    try {
     //distucture name email password in req.body.
     const {name,email,password} = req.body;   

    //  validator user data...
    if(!name){
       return res.status(200).json({status:"Fail",message:'name is require'});
    }
    if(!email){
        return res.status(200).json({status:"Fail",message:'email is require'});
    }
    if(!password){
        return res.status(200).json({status:"Fail",message:'password is require'});
    }
    else if (password.length < 8){
        return res.status(200).json({status:"Fail",message:'password length min 8 charactar'});
    }

    // database validator user data...
    const nameExiste = await registerModel.findOne({name});
    if(nameExiste){
        return res.status(200).json({status:"Fail",message:'name already use.'});
    }
    const emailExiste = await registerModel.findOne({email});
    if(emailExiste){
        return res.status(200).json({status:"Fail",message:'email already use.'});
    }

    // password genarte a has password..
    const hashpassword = await passwordBcrypt(password);

    // save user registration data in database
    const userData = await new registerModel(
        {
            name,email,password:hashpassword
        }
    ).save();

    // server sent a res....
    res.status(200).json({status:"success",Data:userData});

    } catch (err) {
        res.status(200).json({status:"Fail",message:err.message});
    };
};


// login section ......

exports.login = async(req,res)=>{
    try {
    //distucture email password in req.body.
     const {email,password} = req.body;  

    //  validator user data...
     if(!email){
        return res.status(200).json({status:"Fail",message:'email is require'});
    }
    if(!password){
        return res.status(200).json({status:"Fail",message:'password is require'});
    }
    else if (password.length < 8){
        return res.status(200).json({status:"Fail",message:'password length min 8 charactar'});
    }

    // database validator user data...
    const emailExiste = await registerModel.findOne({email});
    if(!emailExiste){
        return res.status(200).json({status:"Fail",message:'user not found.'});
    };

    // password compare a has password..
    const compareHashPassword = await hashPasswordCompar(password,emailExiste.password);
    if(!compareHashPassword){
        return res.status(200).json({status:"Fail",message:'email and passsword is worng.'});
    };

    // create a jwt token..
    const token = jwt.sign({_id:emailExiste._id},process.env.SECRAT_KEY,{expiresIn: "5h"});

     // server sent a res....
     res.status(200).json({status:"success",message:"login succssfully.",token});

    } catch (err) {
        res.status(200).json({status:"Fail",message:err.message});
    };
};


//user  update-Profile,,,

exports.updateProfile = async(req,res)=>{
    try {
    //distucture name email password in req.body.
     const {name,password} = req.body;  

    // database validator user data...
    const nameExiste = await registerModel.findOne({name});
    if(nameExiste){
        return res.status(200).json({status:"Fail",message:'name already use.'});
    }
    if(password){
        if(password.length < 8){
            return res.status(200).json({status:"Fail",message:'password length min 8 charactar'});
        }
    };

    // password genarte a has password..
    const hashpassword = password ? await passwordBcrypt(password): undefined;

    // update user profile..
    const updateData = await registerModel.findByIdAndUpdate({_id:req.User._id},{$set:{name,password:hashpassword}},{new: true});

     // server sent a res....
     res.status(200).json({status:"success",message:"update succssfully.",updateData});

    } catch (err) {
        res.status(200).json({status:"Fail",message:err.message});
    }
};


//check user admin or just user,,

exports.isadminOrUser = async(req,res)=>{
    try {
        res.status(200).json({status:"success",message:"this user is admin.. "});
    } catch (err) {
        res.status(200).json({status:"Fail",message:err.message});
    }
};