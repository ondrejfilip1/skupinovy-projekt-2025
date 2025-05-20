const STRIPE_PK = process.env.STRIPE_PK;
const stripe = require("stripe")(process.env.STRIPE_SK, {
  apiVersion: "2025-02-24.acacia",
});

const Game = require("../models/games");

exports.getPublishableKey = async (req, res) => {
  res.send({
    publishableKey: STRIPE_PK,
  });
};

exports.createPaymentIntent = async (req, res) => {
  try {
    const { cart } = req.body;

    let amount = 0;
    for (const item of cart) {
      const data = await Game.findById(item.productId);
      if (data) amount += data.price * item.amount;
      else
        res.status(404).send({
          message: "Game not found",
        });
    }
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "CZK",
      amount: amount * 100,
      automatic_payment_methods: { enabled: true },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
};

exports.getPaymentIntent = async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(req.params.id);

    res.send({
      paymentIntent,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
};

exports.getBalance = async (req, res) => {
  try {
    const balance = await stripe.balance.retrieve();

    res.send({
      balance,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
};

exports.getPayouts = async (req, res) => {
  try {
    const payouts = await stripe.paymentIntents.list({
      limit: 1000,
    });

    res.send({
      payouts,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
};
