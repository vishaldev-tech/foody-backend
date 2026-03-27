const express = require("express");
const router = express.Router();

const Recipe = require("../models/Recipe");
const { extractVideoData } = require("../utils/extractVideoData");
const { generateRecipe } = require("../services/aiService");

// create from link
router.post("/extract", async (req, res) => {
  const { url } = req.body;

  const metadata = await extractVideoData(url);
  const recipeData = await generateRecipe(url, metadata);

  const recipe = await Recipe.create({
    ...recipeData,
    image: metadata.image
  });

  res.json(recipe);
});

// get all
router.get("/all", async (req, res) => {
  const recipes = await Recipe.find().sort({ createdAt: -1 });
  res.json(recipes);
});

// move recipe
router.put("/move", async (req, res) => {
  const { recipeId, folderId } = req.body;

  const updated = await Recipe.findByIdAndUpdate(
    recipeId,
    { folderId },
    { new: true }
  );

  res.json(updated);
});

module.exports = router;