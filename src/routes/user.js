const express = require('express');
const { userRegister, updateCoins } = require('../controllers/userController');
const { checkTranstion } = require('../middleware/checkTranstion');
const { verifyJWT } = require('../middleware/verifyJWT');
const router = express.Router();

router.post('/register',userRegister);

router.patch('/updateCoins',verifyJWT,checkTranstion, updateCoins)

module.exports = router;