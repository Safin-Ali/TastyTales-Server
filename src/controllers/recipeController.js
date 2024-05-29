const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');

exports.getRecipes = async (req, res) => {
	try {

		const projection = {
			'recipeDetails': 0,
			'embeddedYoutubeUrl': 0
		}

		const result = await getDB().collection(process.env.MONGODB_RECIPES_DATA_COLLECTION).find({}, {
			projection: projection
		}).toArray();

		res.status(200).send(result);

	} catch (error) {
		res.status(500).send('server side error')
	}
}

exports.getRecipe = async (req, res) => {
	try {

		const result = await getDB().collection(process.env.MONGODB_RECIPES_DATA_COLLECTION).findOne({
			_id: ObjectId.createFromHexString(req.params.id)
		})

		res.status(200).send(result);

	} catch (error) {
		res.status(500).send('server side error')
	}
}

exports.addReact = async (req, res) => {

	const db = getDB();
	const usersCollection = db.collection(process.env.MONGODB_USERS_COLLECTION);
	const recipesCollection = db.collection(process.env.MONGODB_RECIPES_DATA_COLLECTION);

	try {
		const {recipeId, userEmail } = req.body;

		if (!userEmail) return res.status(401).send('Unauthorized User');

		const user = await usersCollection.findOne({ email: userEmail });

		const reactExist = user.reacts.includes(recipeId);

		if (!user) return res.status(401).send('Unauthorized User');

		const recipe = await recipesCollection.findOne({ _id: ObjectId.createFromHexString(recipeId) });
		if (!recipe) return res.status(404).send('Recipe not found');

		const userUpdateOp = !reactExist ? { $push: { reacts: recipeId } } : { $pull: { reacts: recipeId } };
		const userUpdateResult = await usersCollection.updateOne({ email: userEmail }, userUpdateOp);

		const recipeUpdateCount = !reactExist ? 1 : -1;
		const recipeUpdateOp = recipeUpdateCount > 0 ? { '$inc': { reacts: recipeUpdateCount } } : recipe.reacts < 0 ? { '$set': { reacts: 0 } } : { $inc: { reacts: recipeUpdateCount } };

		const recipeUpdateResult = await recipesCollection.updateOne(
			{ _id: ObjectId.createFromHexString(recipeId) },
			recipeUpdateOp
		);

		if (userUpdateResult.modifiedCount === 0 || recipeUpdateResult.modifiedCount === 0) {
			return res.status(403).send('React unsuccessful');
		}

		res.status(200).send('React successful');
	} catch (error) {
		res.status(500).send('Server-side error');
	}
}

exports.addRecipe = async (req, res) => {
	try {
		const { ytTutorial,  recipeCategories, ...rest } = req.body;
		const createInsUser = {
			...rest,
			category: recipeCategories,
			watchCount: 0,
			reacts: 0,
			embeddedYoutubeUrl: ytTutorial,
			purchased_by: []
		};

		const result = await getDB().collection(process.env.MONGODB_RECIPES_DATA_COLLECTION).insertOne(createInsUser);

		if (!result.acknowledged) return res.status(500).send('Internal server error');
		return res.status(200).send({id:result.insertedId})
	} catch (error) {
		res.status(500).send('Server-side error');
	}
}