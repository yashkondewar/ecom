const asyncError = require("../middleWare/asyncError")
const stripe = require("stripe")('sk_test_51OfOCiSHvd1E0WuzKx6SDRkq0NfCsqhfuTkCIj5kZDqMGyeZeG1LW4JD7bRsF3KwjGZ1dpneWrWxyYiKwVv8N81V00kCxg2d7k')

exports.processPayment = asyncError(async (req, res, next) => {
  try{
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "inr",
      metadata: {
        company: "Ecommerce",
      },
    });
    res
      .status(200)
      .json({ success: true, client_secret: myPayment.client_secret });
  }
  catch(error){
    console.log(error)
    res.status(401).json({error})
  }
    
});

exports.sendStripeKey = asyncError( async(req, res, next) => {
    res.status(200).json({
        success: true,
        stripeKey: process.env.STRIPE_API_KEY,
    })
})