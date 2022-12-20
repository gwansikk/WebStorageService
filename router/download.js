const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/:id", (req, res) => {
  const filePath = path.join(__dirname, "../upload/" + req.params.id);
  console.log(filePath);

  res.status(200).download(filePath);
});

module.exports = router;
