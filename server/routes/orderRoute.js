const express = require("express");
const {createOrder, myOrders, getSingleOrder, getAllOrders, deleteOrder, updateOrder} = require("../controllers/orderController")
const { isAuthenticatedUser, authorizeRoles } = require("../middleWare/auth");
const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser,createOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder)
router.route("/orders/me").get(isAuthenticatedUser, myOrders);
router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);
router.route("/admin/order/:id")
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder)
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)





module.exports = router