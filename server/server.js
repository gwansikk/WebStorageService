const express = require("express");
const fs = require("fs");
const cors = require("cors");
const multer = require("multer");

const app = express();
const port = 13621;

app.use(cors());

app.listen(port, () => {
  const dir = "server/upload";
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  console.log(`http://localhost:${port}`);
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "server/upload");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname.toString("utf-8"));
  },
});

const upload = multer({ storage: storage });

app.post("/files", upload.array("files"), (req, res, next) => {
  req.files.forEach((data, index) => {
    console.log(index + " --------------------------------");
    console.log("필드명: ", data.fieldname);
    console.log("업로드 파일명: ", data.originalname);
    console.log("인코딩 타입: ", data.encoding);
    console.log("MIME 타입: ", data.mimetype);
    console.log("서버에 저장된 경로: ", data.destination);
    console.log("서버에 저장된 파일명: ", data.filename);
    console.log("전체 경로: ", data.path);
    console.log("파일 byte 크기: ", data.size);
    console.log(index + " --------------------------------");
  });

  res.json({ message: "Ok!" });
});
