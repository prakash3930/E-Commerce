const categoryModel = require("../models/category.model");
const slugify =  require('slugify');

// category create section ....

exports.createCategory = async(req,res)=>{
    try {
     //distucture name in req.body.
     const {name} = req.body;   

    //  validator category data...
    if(!name){
       return res.status(200).json({status:"Fail",message:'name is require'});
    }
   
    // database validator category data...
    const nameExiste = await categoryModel.findOne({name});
    if(nameExiste){
        return res.status(200).json({status:"Fail",message:'name already use.'});
    }

    // save user category data in database
    const categoryData = await new categoryModel(
        {
            name,slug:slugify(name)
        }
    ).save();

    // server sent a res....
    res.status(200).json({status:"success",Data:categoryData});

    } catch (err) {
        res.status(200).json({status:"Fail",message:err.message});
    };
};



// category all get section ....

exports.getCategory = async(req,res)=>{
    try {
    // get all product category data in database
    const categoryData = await categoryModel.find();

    // server sent a res....
    res.status(200).json({status:"success",message:"Get successfuly",Data:categoryData});

    } catch (err) {
        res.status(200).json({status:"Fail",message:err.message});
    };
};


// category update section ....

exports.updateCategory = async(req,res)=>{
    try {
     //distucture name or category id in req.body or params.
     const {name} = req.body;   
     const {id} = req.params;

    //  validator category data...
    if(name.length < 3){
        return res.status(200).json({status:"Fail",message:'name length min 3 charactar'});
    }
    else if(name.length > 30){
        return res.status(200).json({status:"Fail",message:'name length max 30 charactar'});
    }
   
    // database validator category data...
    const nameExiste = await categoryModel.findOne({name});
    if(nameExiste){
        return res.status(200).json({status:"Fail",message:'name already use.'});
    }

    // update product category data in database
    const categoryData = await categoryModel.findByIdAndUpdate({_id:id},
        {
            $set:{
                name,slug:slugify(name)
            }
        },
        {new: true}
    );

    // server sent a res....
    res.status(200).json({status:"success",message:"update successfuly",Data:categoryData});

    } catch (err) {
        res.status(200).json({status:"Fail",message:err.message});
    };
};


// category delete section ....

exports.deleteCategory = async(req,res)=>{
    try {
    //distucture category id in req.params.
    const {id} = req.params;
    if(!id){
        return res.status(200).json({status:"Fail",message:"I can't find any user."});
    };

    // delete product category data in database
    const categoryData = await categoryModel.findByIdAndRemove({_id:id},{new: true});

    // server sent a res....
    res.status(200).json({status:"success",message:"delete successfuly",Data:categoryData});

    } catch (err) {
        res.status(200).json({status:"Fail",message:err.message});
    };
};