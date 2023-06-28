const fs = require('fs');
const slugify =  require('slugify');
const productModel = require("../models/product.model");



// create a product..
exports.createProduct = async(req,res)=>{
    try {
    //distucture product content in req.fields.
     const {name,description,price,category,shipping} = req.fields;   
     const {photo} = req.files;
     //  validator product data...
     if(!name){
        return res.status(200).json({status:"Fail",message:'name is require'});
     }
     const existed = await productModel.findOne({name});
     if(existed){
        return res.status(200).json({status:"Fail",message:'name is already takan.'});
     }
     if(!description){
         return res.status(200).json({status:"Fail",message:'description is require'});
     }
     if(!price){
         return res.status(200).json({status:"Fail",message:'price is require'});
     }
     if(!category){
        return res.status(200).json({status:"Fail",message:'category is require'});
    }
    if(!shipping){
        return res.status(200).json({status:"Fail",message:'shipping is require'});
    }  
    if(!photo){
        return res.status(200).json({status:"Fail",message:'photo is require'});
    }
    else if(photo && photo.size > 1000000){
        return res.status(200).json({status:"Fail",message:'photo min size less than  1mb. '});
    }

    // product data save in database...
    // const productData = new productModel({...req.fields,slug:slugify(name),photo:{contentType:photo.type,data:fs.readFileSync(photo.path)}}).save();

    const productData = new productModel({...req.fields,slug:slugify(name)});

   

    if(photo){
        productData.photo.data = fs.readFileSync(photo.path);
        productData.photo.contentType = photo.type;
    };
    await productData.save();

    // product respons sent....
    res.status(200).json({status:"successs",message:"uploaded done..."});

    } catch (err) {
        res.status(200).json({status:"Fail",message:err.message});
    }
};



// get a product list .......

exports.productList = async(req,res)=>{
    try {
        // find a all product in database..
        const getProduct = await productModel.find({})
                           .populate("category")
                           .select("-photo")
                           .sort({createdAt:-1})
                           .limit(12);

    // get product list respons sent....
    res.status(200).json({getProduct});

    } catch (err) {
        res.status(200).json({status:"Fail",message:err.message});
    }
};


// get a single product in slug .......

exports.slugGetProduct = async(req,res)=>{
    try {
          // find a single product  in slug..
          const slugProduct = await productModel.findOne({slug:req.params.slug})
                              .populate("category")
                              .select("-photo");

          // get product list respons sent....
           res.status(200).json({slugProduct});

    } catch (err) {
        res.status(200).json({status:"Fail",message:err.message});
    }
};


// get a single product img in badabase .......

exports.GetProductImg = async(req,res)=>{
    try {
          // find a single product img in database..
          const productImg = await productModel.findById({_id:req.params.productId})
                              .select("photo");

          // get respons sent....
            res.set('content-type',productImg.photo.contentType);
            res.status(200).send(productImg.photo.data);

    } catch (err) {
        res.status(200).json({status:"Fail",message:err.message});
    }
};


// update a product..
exports.updateProduct = async(req,res)=>{
    try {
    //distucture product content in req.fields.
     const {name} = req.fields;      
     const {photo} = req.files;
     //  validator product data...
     const existed = await productModel.findOne({name});
     if(existed){
        return res.status(200).json({status:"Fail",message:'name is already takan.'});
     }
     if(photo && photo.size > 1000000){
        return res.status(200).json({status:"Fail",message:'photo min size less than  1mb. '});
     }

    // product data save in database...

    const productData = await productModel.findByIdAndUpdate({_id:req.params.productId},{...req.fields,slug:slugify(name)},{new: true}).  populate("category");

    if(photo){
        productData.photo.data = fs.readFileSync(photo.path);
        productData.photo.contentType = photo.type;
    };
    await productData.save();

    // update product respons sent....
    res.status(200).json({productData});

    } catch (err) {
        res.status(200).json({status:"Fail",message:err.message});
    }
};


// delete a single product..
exports.deleteProduct = async(req,res)=>{
    try {
    // product delete in database...
    const productData = await productModel.findByIdAndDelete({_id:req.params.productId},{select:"-photo"},{new: true});

    // update product respons sent....
    res.status(200).json({productData});

    } catch (err) {
        res.status(200).json({status:"Fail",message:err.message});
    }
};


// filterby category id ...
exports.filterProduct = async(req,res)=>{
    try {
        // distructure checkout and radio in req.body...
        const {check,radio} = req.body;

        let arge = {};
        if(check.length > 0){
            arge.category=check;
        } 
        if(radio.length){
            arge.price={$gte:radio[0],$lte:radio[1]};
        }
      // product data filter in database...

      const filterProduct = await productModel.find(arge).select('-photo').populate('category');

        // filter product respons sent....
        res.status(200).json({filterProduct});

    } catch (err) {
        res.status(200).json({status:"Fail",message:err.message});
    }
};

// product count..

exports.productCount = async(req,res)=>{
    try {
        // product count in database...

      const countProduct = await productModel.find({}).countDocuments();

      // count product respons sent....
      res.status(200).json({countProduct});

    } catch (err) {
        res.status(200).json({status:"Fail",message:err.message});
    }
};

//  viewsproduct list..

exports.viewProductList = async(req,res)=>{
    try {
        // distructure  product page..
        const {page} = req.params;

        const limitP = 5;
        const pages = page ? page : 1;

        //views product list data filter in database...

      const filterProduct = await productModel.find({}).select('-photo').skip((pages -1)*limitP).sort({createdAt:-1})
      .limit(5);

      // view product respons sent....
      res.status(200).json({filterProduct});

    } catch (err) {
        res.status(200).json({status:"Fail",message:err.message});
    }
};


// product search by keyword...

exports.productSearch = async(req,res)=>{
    try {
                // distructure  product keyword..
                const {keyword} = req.params;

      //views product list data filter in database...

      const searchProduct = await productModel.find({$or:[{name:{$regex:keyword,$options:'i'}},{description:{$regex:keyword,$options:'i'}}]}).select('-photo').limit(5);

      // search  product respons sent....
      res.status(200).json({searchProduct});

    } catch (err) {
        res.status(200).json({status:"Fail",message:err.message});
    }
};


// relataed product...

exports.productRelated = async(req,res)=>{
    try {
        // distructure  product keyword..
        const {productId} = req.params;

      //views product list data filter in database...

      const selectProduct = await productModel.findById({_id:productId}).select('-photo');

      const relatedProduct = await productModel.find({category:selectProduct.category}).select('-photo').limit(5);

      // search  product respons sent....
      res.status(200).json({relatedProduct});

    } catch (err) {
        res.status(200).json({status:"Fail",message:err.message});
    }
};