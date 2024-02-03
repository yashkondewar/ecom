const express = require("express");
const { processPayment, sendStripeKey } = require("../controllers/paymentController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleWare/auth");

const router = express.Router();

router.route("/payment/process").post(isAuthenticatedUser, processPayment)
router.route("/stripekey").get(isAuthenticatedUser, sendStripeKey)

module.exports = router;