const express = require("express");
const fs = require("fs");
const helmet = require("helmet");
const cors = require("cors");

const manager = require("./router/manager");
const upload = require("./router/upload");

const app = express();
const port = 13621;

app.use(cors());
app.use(helmet());

app.use("/", manager);
app.use("/upload", upload);

app.listen(port, () => {
  const dir = "server/upload";
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  console.log(`http://localhost:${port} - 정상`);
});
