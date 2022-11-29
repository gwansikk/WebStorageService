const express = require("express");
const fs = require("fs");
const router = express.Router();

router.get("/", (req, res) => {
  fs.readdir("server/upload", (err, data) => {
    console.log(data);

    if (data) {
      res.status(200).send({
        files: data,
      });
    }
  });
});

module.exports = router;
