const express = require("express");
const router = express.Router();
const stripeRouter = require("../controllers/stripe");

router.get("/config", stripeRouter.getPublishableKey);

router.post("/create-payment-intent", stripeRouter.createPaymentIntent);

// ziska paymentIntent (informace o platbe)
router.get("/retrieve-payment-intent/:id", stripeRouter.getPaymentIntent);

module.exports = router;