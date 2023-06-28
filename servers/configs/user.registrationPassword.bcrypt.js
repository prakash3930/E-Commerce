const bcrypt = require('bcrypt');


exports.passwordBcrypt = (password)=>{
    try {
        return new Promise((resolve, reject)=>{
            bcrypt.genSalt(12,(err,salt)=>{
                if(err){
                    reject(err);
                }
                else{
                    bcrypt.hash(password,salt,(err,hash)=>{
                        if(err){
                            reject(err);
                        }else{
                            resolve(hash);
                        }
                    })
                }
            })
        })
    } catch (err) {
        res.status(200).json({status:"Fail",message:err.message});
    }
};

exports.hashPasswordCompar = async(password,hash)=>{
    try {
        return bcrypt.compare(password,hash);
    } catch (err) {
        res.status(200).json({status:"Fail",message:err.message});
    }
}