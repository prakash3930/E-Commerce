const express = require('express');
const { verifyPassword, isAdmin } = require('../middlewares/user.password.middleware');
const { getOrders, creatOrder, allOrder } = require('../controllers/order.controller');
const router = express.Router();


// create order by user...
router.post('/create-order',verifyPassword,creatOrder);
// get order by user...
router.get('/order-user',verifyPassword,getOrders);
// get all order by admin...
router.get('/order-get-admin',verifyPassword,isAdmin,allOrder);



// export router..
module.exports = router;