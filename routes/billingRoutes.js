const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");

module.exports = (app) => {
  app.post("/api/stripe", requireLogin, async (req, res) => {
    console.log(req.body);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 500,
      currency: "usd",
      description: "$5 for 5 Credits",
      source: req.body.id,
    });
    // console.log(paymentIntent);
    req.user.credits += 5;
    const user = await req.user.save();

    res.send(user);
  });
};
