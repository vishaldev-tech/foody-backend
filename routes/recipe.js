const express = require("express");
const router = express.Router();
const { extractRecipe } = require("../controllers/recipeController");

router.post("/extract", extractRecipe);

module.exports = router;