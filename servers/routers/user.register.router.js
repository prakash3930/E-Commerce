const express = require('express');
const { register, login, updateProfile, isadminOrUser } = require('../controllers/user.register.controller');
const { verifyPassword, isAdmin } = require('../middlewares/user.password.middleware');
const router = express.Router();




// create a user and update a profile......
router.post('/register',register);
router.post('/login',login);
router.post('/update-profile',verifyPassword,updateProfile);
router.get('/check-admin-user',verifyPassword,isAdmin,isadminOrUser);




// export router..
module.exports = router;