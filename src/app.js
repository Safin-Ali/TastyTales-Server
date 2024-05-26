// index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());

app.use(cors({
	origin:'https://tasty-tales.vercel.app/',
	allowedHeaders: ['Content-Type', 'Authorization'],
	credentials:true,
	optionsSuccessStatus: 200,
	methods:['GET','POST']
}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
