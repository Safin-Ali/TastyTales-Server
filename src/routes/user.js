const express = require('express');
const { userRegister } = require('../controllers/userControler');
const router = express.Router();

router.post('/register', userRegister);

module.exports = router;