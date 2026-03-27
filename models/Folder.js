const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema({
  name: String,
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Folder",
    default: null
  }
});

module.exports = mongoose.model("Folder", folderSchema);