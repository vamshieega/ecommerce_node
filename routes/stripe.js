const router = require("express").Router();
const stripe = require("stripe")(
  "sk_test_51KKbn7AJyFQljqNeBxeEKUKGrCUwvHwhhgN3Chb92fBUuBAIq1bJtK2Ku8TxteWEQWb0BJksRMO7mFKtnof0K2DN00vW6dyv8z"
);

router.post("/payment", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "USD",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        console.log("stripeErr", stripeErr);
        res.status(500).json(stripeErr);
      } else {
        console.log("stripeRes", stripeRes);
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;
