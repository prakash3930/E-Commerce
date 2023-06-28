const express = require('express');
const router = express.Router();
const { verifyPassword, isAdmin } = require('../middlewares/user.password.middleware');
const { createProduct, productList, slugGetProduct, GetProductImg, updateProduct, deleteProduct, filterProduct, productCount, viewProductList, productSearch, productRelated } = require('../controllers/product.controller');
const formidable = require('express-formidable');


// create a product......
router.post('/product',verifyPassword,isAdmin,formidable(),createProduct);
// get a product list..
router.get('/product-list',productList);
// get a single  product in slug..
router.get('/product-slug/:slug',slugGetProduct);
// get a single  product img in database..
router.get('/product-img/:productId',GetProductImg);
// get a single  product update..
router.put('/product-update/:productId',verifyPassword,isAdmin,formidable(),updateProduct);
// get a single  product delete..
router.delete('/product-delete/:productId',verifyPassword,isAdmin,deleteProduct);
// filter  product..
router.post('/product-filter',filterProduct);
// count  product..
router.get('/product-count',productCount);
// count  product..
router.get('/product-veiw-list/:page',viewProductList);
// search  product..
router.get('/product-search/:keyword',productSearch);
// related  product..
router.post('/product-related/:productId',productRelated);


// export router..
module.exports = router;