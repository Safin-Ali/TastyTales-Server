const express = require('express');
const { getRecipes, getRecipe, addReact } = require('../controllers/recipeController');
const router = express.Router();

router.get('/getRecipes', getRecipes);

router.get('/getRecipe/:id', getRecipe);

router.patch('/addReact', addReact)

module.exports = router;