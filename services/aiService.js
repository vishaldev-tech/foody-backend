const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.generateRecipe = async (url, metadata) => {
  // 🥇 STEP 1: RAW EXTRACTION
  const step1 = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: `
Extract a rough recipe from:
${metadata.title} (${url})

Return JSON with ingredients + steps.
`,
      },
    ],
  });

  const draft = step1.choices[0].message.content;

  // 🥈 STEP 2: REFINEMENT
  const step2 = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: `
Improve this recipe:

${draft}

Fix:
- quantities (realistic)
- steps clarity
- units (grams/ml)

Return clean JSON.
`,
      },
    ],
  });

  const refined = step2.choices[0].message.content;

  // 🥉 STEP 3: FINAL STRUCTURE + NUTRITION
  const step3 = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: `
Convert this into FINAL format:

${refined}

Add:
- servings
- cookingTime
- nutrition estimate

Return STRICT JSON:
{
  "title": "",
  "servings": 2,
  "ingredients": [],
  "steps": [],
  "nutrition": {}
}
`,
      },
    ],
  });

  return JSON.parse(step3.choices[0].message.content);
};
