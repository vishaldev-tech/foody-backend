const { generateRecipe } = require("../services/aiService");

exports.extractRecipe = async (req, res) => {
  try {
    const { url } = req.body;

    const recipe = await generateRecipe(url);

    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};