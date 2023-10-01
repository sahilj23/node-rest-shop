const express = require('express') ;
const router =  express.Router() ;

const checkAuth = require('../middleware/check-auth');


const ObjectId = mongoose.Types.ObjectId ;

const OrdersController = require('../controllers/orders');

 // handle incoming get requests to /orders
 router.get('/', checkAuth, OrdersController.orders_get_all);
 router.post('/',checkAuth, OrdersController.orders_create_order) ;

 // get information about the individual orders
 router.get('/:orderId',checkAuth, OrdersController.orders_get_order) ;

 router.delete('/:orderId',checkAuth, OrdersController.orders_delete_order ) ;

 module.exports = router;