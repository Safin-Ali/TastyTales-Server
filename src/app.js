// index.js
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const userRoutes = require('./routes/user');
const recipeRoutes = require('./routes/recipe');
const purchaseRoutes = require('./routes/payment');
require('dotenv').config();

const app = express();
connectDB();

app.use(express.json());

app.use(cors({
	origin:'https://tasty-tales.vercel.app/',
	allowedHeaders: ['Content-Type', 'Authorization'],
	credentials:true,
	optionsSuccessStatus: 200,
	methods:['GET','POST']
}));

// users route
app.use('/api/users', userRoutes);

// recipes route
app.use('/api/recipe',recipeRoutes);

// purchase route
app.use('/api/purchase',purchaseRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
