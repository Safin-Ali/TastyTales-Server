const express = require('express');
const { recipePurchase } = require('../controllers/purchaseController');
const router = express.Router();

router.post('/recipe', recipePurchase);

module.exports = router;