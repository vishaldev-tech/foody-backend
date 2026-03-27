const express = require("express");
const router = express.Router();
const Folder = require("../models/Folder");

router.post("/create", async (req, res) => {
  const folder = await Folder.create(req.body);
  res.json(folder);
});

router.get("/all", async (req, res) => {
  const folders = await Folder.find();
  res.json(folders);
});

module.exports = router;