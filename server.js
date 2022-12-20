const express = require("express");
const fs = require("fs");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();

const find = require("./router/find");
const upload = require("./router/upload");
const download = require("./router/download");

const app = express();
const port = process.env.API_PORT || 13621;

// app.use(cors());
app.use(helmet.xssFilter());

app.use("/api", find);
app.use("/api/download", download);
app.use("/api/upload", upload);

app.use(express.static(path.join(__dirname, "client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(port, () => {
  const dir = path.join(__dirname, "upload");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  console.log(`http://localhost:${port} - 정상`);
});
