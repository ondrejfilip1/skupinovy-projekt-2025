const express = require("express");
const router = express.Router();
const stripeRouter = require("../controllers/stripe");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/config", stripeRouter.getPublishableKey);

router.post("/create-payment-intent", stripeRouter.createPaymentIntent);

// ziska paymentIntent (informace o platbe)
router.get("/retrieve-payment-intent/:id", stripeRouter.getPaymentIntent);

// ziska celkovou balanci
router.get("/balance", auth, admin, stripeRouter.getBalance)

router.get("/payouts", auth, admin, stripeRouter.getPayouts)

module.exports = router;