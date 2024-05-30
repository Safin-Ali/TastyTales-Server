const stripe = require('stripe')(process.env.STRIPE_SK);

exports.checkTranstion = async (req,res,next) => {
	const { paymentIntentId } = req.body;
    try {
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
        req.transSts = { exists: true, coins: paymentIntent.amount/100*10};
		next()
    } catch (error) {
		res.status(402).send('Payment required')
    }
}