const express = require('express');
const { getRecipes, getRecipe, addReact, addRecipe } = require('../controllers/recipeController');
const router = express.Router();

router.get('/getRecipes', getRecipes);

router.get('/getRecipe/:id', getRecipe);

router.post('/addRecipe', addRecipe);

router.patch('/addReact', addReact);

module.exports = router;