const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema({
  name: String,
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: "Folder" },
});

module.exports = mongoose.model("Folder", folderSchema);