const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const userRoutes = require('./routes/user');
const recipeRoutes = require('./routes/recipe');
const purchaseRoutes = require('./routes/payment');
const { verifyJWT } = require('./middleware/verifyJWT');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const app = express();
connectDB();

app.use(express.json());

app.use(cors({
	origin:'https://tasty-tales.vercel.app',
	allowedHeaders: ['Content-Type', 'Authorization','Email'],
	credentials:true,
	optionsSuccessStatus: 200,
	methods:['GET','POST','PATCH']
}));

// users route
app.use('/api/users', userRoutes);

// recipes route
app.use('/api/recipe',recipeRoutes);

// purchase route
app.use('/api/purchase',verifyJWT,purchaseRoutes);

app.get('/api/jwt',(req,res) => {
	try {
		const encryptJWTToken = jwt.sign(req.headers.email,process.env.JWT_TOKEN);
		res.send({encryptJWTToken})
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
