const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');

exports.getRecipes = async (req, res) => {
	try {

		const projection = {
			'recipeDetails': 0,
			'embeddedYoutubeUrl': 0,
			'category': 0
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