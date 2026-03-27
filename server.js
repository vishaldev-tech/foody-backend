require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const recipeRoutes = require("./routes/recipe");
const folderRoutes = require("./routes/folder");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api/recipe", recipeRoutes);
app.use("/api/folder", folderRoutes);

app.listen(5000, () => console.log("Server running"));
