const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.generateRecipe = async (url) => {
  const prompt = `
You are a professional chef.

From this video URL: ${url}

Extract a HIGH QUALITY structured recipe.

Rules:
- Convert vague instructions into clear steps
- Standardize units (grams, ml)
- Estimate missing quantities realistically
- Keep steps simple and actionable
- Infer cooking time if missing

Return ONLY JSON:

{
  "title": "",
  "servings": number,
  "ingredients": [
    { "name": "", "quantity": number, "unit": "" }
  ],
  "steps": [],
  "nutrition": {
    "calories": number,
    "protein": number,
    "carbs": number,
    "fat": number
  }
}
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  return JSON.parse(response.choices[0].message.content);
};