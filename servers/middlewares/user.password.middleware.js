const jwt = require('jsonwebtoken');
const registerModel = require('../models/user.registration.model');

// password verify..
exports.verifyPassword = (req,res,next)=>{
    try {
        // distucture token in headers..
        const {token} = req.headers;
        if(!token){
            res.status(200).json({status:"Fail",message:"auth token is missing."});
        };

        // jwt verify.
      const Data = jwt.verify(token,process.env.SECRAT_KEY,(err,data)=>{
        if(err){
            console.log(err.message);
        }else{
            return data;
        }
      });
      
    // add a req.... 
      req.User = Data;

      next();

    } catch (err) {
        res.status(200).json({status:"Fail",message:err.message});
    }
};


// admin checker....

exports.isAdmin = async(req,res,next)=>{
  try {
    const admin = await registerModel.findById(req.User._id);
    if (admin.role != 1) {
     return res.status(200).json({status:"fail",message:"Your can't access anythink because you are just a user not admin."});
  } else {
      next();
  };
  } catch (err) {
    res.status(200).json({status:"Fail",message:err.message});
  }
};

