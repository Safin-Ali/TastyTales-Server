const express = require('express');
const { getRecipes, getRecipe } = require('../controllers/recipeController');
const router = express.Router();

router.get('/getRecipes', getRecipes);

router.get('/getRecipe/:id', getRecipe);

module.exports = router;