const { MongoClient } = require('mongodb');
require('dotenv').config();

const client = new MongoClient(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const connectDB = async () => {
	try {
		await client.connect();
		console.log('MongoDB connected');
	} catch (err) {
		console.error(err.message);
	}
};

const getDB = () => {
	return client.db(process.env.MONGODB_DB_NAME);
};

module.exports = { connectDB, getDB };
