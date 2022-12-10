const express = require("express");
const fs = require("fs");
const router = express.Router();

const formatBytes = (bytes) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(0)) + sizes[i];
};

router.get("/", (req, res) => {
  fs.readdir("upload", (err, data) => {
    const info = [];

    if (err) {
      console.log(err);

      res.status(500).send({
        result: "fail",
      });
    } else {
      data.forEach((value) => {
        const file = fs.statSync("upload/" + value);
        const fileSize = formatBytes(file.size);
        const fileCreateTime = file.birthtime.toLocaleDateString();
        const newFileInfo = [value, fileSize, fileCreateTime];

        info.push(newFileInfo);
      });

      res.status(200).send({
        result: "success",
        data: info,
      });
    }
  });
});

module.exports = router;
