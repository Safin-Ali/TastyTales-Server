const express = require('express');
const { getRecipes, getRecipe, addReact, addRecipe } = require('../controllers/recipeController');
const { verifyJWT } = require('../middleware/verifyJWT');
const router = express.Router();

router.get('/getRecipes', getRecipes);

router.get('/getRecipe/:id', verifyJWT, getRecipe);

router.post('/addRecipe', verifyJWT, addRecipe);

router.patch('/addReact', verifyJWT, addReact);

module.exports = router;