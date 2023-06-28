const express = require('express');
const router = express.Router();
const { verifyPassword, isAdmin } = require('../middlewares/user.password.middleware');
const { createCategory, updateCategory, deleteCategory, getCategory } = require('../controllers/category.controller');



// create a product category and update and delete or get......

router.post('/category',verifyPassword,isAdmin,createCategory);
router.get('/get-category',verifyPassword,isAdmin,getCategory);
router.post('/update-category/:id',verifyPassword,isAdmin,updateCategory);
router.post('/delete-category/:id',verifyPassword,isAdmin,deleteCategory);



// export router..
module.exports = router;