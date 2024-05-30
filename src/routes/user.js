const express = require('express');
const { userRegister, updateCoins } = require('../controllers/userController');
const { checkTranstion } = require('../middleware/checkTranstion');
const { getDB } = require('../config/db');
const router = express.Router();

router.post('/register', userRegister);

router.patch('/updateCoins', checkTranstion, updateCoins)

module.exports = router;