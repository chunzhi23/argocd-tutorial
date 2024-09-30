const express = require("express");
const path = require("path");

const indexRouter = require("./routes");

const app = express();

require("dotenv").config();
const port = process.env.PORT;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", indexRouter);

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});