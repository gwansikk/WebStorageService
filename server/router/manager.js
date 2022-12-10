const express = require("express");
const fs = require("fs");
const router = express.Router();

router.get("/", (req, res) => {
  const info = [];

  fs.readdir("upload", (err, data) => {
    data.forEach((value) => {
      fs.stat("upload/" + value, (err, stats) => {
        if (err) {
          console.log(`File doesn't exist.`);
        } else {
          info.push(stats.size);
        }
      });
    });

    if (data) {
      res.status(200).send({
        files: data,
        info: info,
      });
    } else {
      res.status(200).send({
        result: "success",
        files: [],
      });
    }
  });
});

module.exports = router;
