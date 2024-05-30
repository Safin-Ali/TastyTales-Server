const stripe = require('stripe')(process.env.STRIPE_SK);
const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');

exports.recipePurchase = async (req, res) => {
	try {
		const { userEmail, recipesId } = req.query;

		if (!userEmail || !recipesId) {
			return res.status(400).send('Missing userEmail or recipesId');
		}

		const db = getDB();
		const usersCollection = db.collection(process.env.MONGODB_USERS_COLLECTION);
		const recipesCollection = db.collection(process.env.MONGODB_RECIPES_DATA_COLLECTION);

		const user = await usersCollection.findOne({ email: userEmail });
		if (!user) return res.status(401).send('Unauthorized User');

		const recipe = await recipesCollection.findOne({ _id: ObjectId.createFromHexString(recipesId) });

		if (!recipe) return res.status(404).send('Recipe not found');

		if (recipe.purchased_by.includes(userEmail)) return res.status(409).send('Already Purchased');

		if (user.coin < 10) return res.status(403).send('Not enough coins');

		const userUpdateResult = await usersCollection.updateOne(
			{ email: userEmail },
			{ $inc: { coin: -10 } }
		);
		if (userUpdateResult.modifiedCount === 0) return res.status(403).send('Purchase not successful');

		const creatorUpdateResult = await usersCollection.updateOne(
			{ email: recipe.creatorEmail },
			{ $inc: { coin: 1 } }
		);
		if (creatorUpdateResult.modifiedCount === 0) return res.status(403).send('Purchase not successful');

		const recipeUpdateResult = await recipesCollection.updateOne(
			{ _id: ObjectId.createFromHexString(recipesId) },
			{
				$push: { purchased_by: userEmail },
				$inc: { watchCount: 1 }
			}
		);
		if (recipeUpdateResult.modifiedCount === 0) return res.status(403).send('Purchase not successful');

		return res.status(200).send('Purchase successful');
	} catch (error) {
		console.error(error);
		res.status(500).send('Server side error');
	}
}

exports.createPaymentIntent = async (req, res) => {
	try {
		const { amount } = req.body;
	const paymentIntent = await stripe.paymentIntents.create({
		amount: parseInt(amount) * 100,
		currency: 'usd',
	});

	res.status(200).json({ clientSecret: paymentIntent.client_secret });
	} catch (error) {
		console.error(error);
    res.status(500).json({ error: 'Internal server error' });
	}
}