const express = require("express");
const cors = require("cors");

const recipeRoutes = require("./routes/recipe");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/recipe", recipeRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});