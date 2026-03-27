function buildTree(folders, parentId = null) {
  return folders
    .filter((f) => String(f.parentId) === String(parentId))
    .map((f) => ({
      ...f._doc,
      children: buildTree(folders, f._id),
    }));
}

module.exports = { buildTree };
