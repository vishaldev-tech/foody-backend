const axios = require("axios");

exports.getNutrition = async (ingredients) => {
  const res = await axios.post(
    "https://api.edamam.com/api/nutrition-details",
    {
      ingr: ingredients.map(i => `${i.quantity} ${i.name}`)
    },
    {
      params: {
        app_id: process.env.EDAMAM_ID,
        app_key: process.env.EDAMAM_KEY
      }
    }
  );

  return res.data.totalNutrients;
};