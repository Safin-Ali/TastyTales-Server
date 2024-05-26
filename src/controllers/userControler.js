const {getDB} = require('../config/db')

exports.userRegister = async (req, res) => {

	try {

		const db = getDB();

		const userExist = await db.collection(process.env.MONGODB_USERS_COLLECTION).findOne({
			email: req.body.email
		})

		if (userExist) {
			return res.status(200).send(userExist)
		}

		const result = await db.collection(process.env.MONGODB_USERS_COLLECTION).insertOne({
			...req.body,
			coin: 50
		})

		if (result.acknowledged) {
			return res.status(200).send({ ...req.body, coin: 50 })
		}
		res.status(401).send('unsuccess')
	} catch (error) {
		console.log(error);
		res.status(500).send('unsuccess')
	}
}