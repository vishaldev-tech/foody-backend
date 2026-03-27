const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: String,
  image: String,
  servings: Number,
  ingredients: Array,
  steps: Array,
  nutrition: Object,
  folderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Folder",
    default: null
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Recipe", recipeSchema);