const express = require('express');
const { recipePurchase, createPaymentIntent } = require('../controllers/purchaseController');
const router = express.Router();

router.post('/recipe', recipePurchase);

router.post(`/createPaymentIntent`,createPaymentIntent)

module.exports = router;