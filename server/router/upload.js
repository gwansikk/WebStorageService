const express = require("express");
const multer = require("multer");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload");
  },

  filename: function (req, file, cb) {
    console.log(file);
    cb(null, Date.now() + "-" + decodeURIComponent(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.array("files"), (req, res) => {
  req.files.forEach((data, index) => {
    console.log(" --------------------------------");
    console.log("번호: ", index + 1);
    console.log("파일명: ", decodeURIComponent(data.originalname));
    console.log("MIME 타입: ", data.mimetype);
    console.log("서버에 저장된 경로: ", data.path);
    console.log("파일 byte 크기: ", data.size);
  });

  res.json({ message: "upload success" });
});

module.exports = router;
