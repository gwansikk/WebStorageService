const express = require("express");
const fs = require("fs");
const router = express.Router();

function formatBytes(bytes) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(0)) + " " + sizes[i];
}

router.get("/", (req, res) => {
  fs.readdir("upload", (err, data) => {
    const files = [];

    data.forEach((value) => {
      const fileSize = formatBytes(fs.statSync("upload/" + value).size);
      const newFileInfo = [value, fileSize];
      files.push(newFileInfo);
    });

    if (err) {
      console.log(err);
    } else {
      res.status(200).send({
        result: "success",
        files: files,
      });
    }
  });
});

module.exports = router;
