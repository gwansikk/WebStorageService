const express = require("express");
const fs = require("fs");
const router = express.Router();

router.get("/", (req, res) => {
  fs.readdir("upload", (err, data) => {
    // console.log(data);

    if (data) {
      res.status(200).send({
        files: data,
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
