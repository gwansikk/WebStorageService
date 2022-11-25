const express = require("express");
const fs = require("fs");
const cors = require("cors");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "server/upload");
  },

  filename: function (req, file, cb) {
    console.log(file);
    cb(null, Date.now() + "-" + decodeURIComponent(file.originalname));
  },
});

const app = express();
const port = 13621;

app.use(cors());

app.listen(port, () => {
  const dir = "server/upload";
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  console.log(`http://localhost:${port}`);
});

const upload = multer({ storage: storage });

app.post("/files", upload.array("files"), (req, res, next) => {
  req.files.forEach((data, index) => {
    console.log(" --------------------------------");
    console.log("-- 클라이언트 --");
    console.log("업로드 순서: ", index + 1);
    console.log("필드명: ", data.fieldname);
    console.log("파일명: ", decodeURIComponent(data.originalname));
    console.log("MIME 타입: ", data.mimetype);

    console.log("-- 서버 --");
    console.log("서버에 저장된 경로: ", data.destination);
    console.log("서버에 저장된 파일명: ", data.filename);
    // console.log("전체 경로: ", data.path);
    console.log("파일 byte 크기: ", data.size);
  });

  res.json({ message: "upload success" });
});
