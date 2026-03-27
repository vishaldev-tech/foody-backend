const { extractVideoData } = require("../utils/extractVideoData");
const { generateRecipe } = require("../services/aiService");

const Recipe = require("../models/Recipe");

exports.extractRecipe = async (req, res) => {
  const { url } = req.body;

  const metadata = await extractVideoData(url);
  const recipeData = await generateRecipe(url, metadata);

  const recipe = await Recipe.create({
    ...recipeData,
    image: metadata.image
  });

  res.json(recipe);
};