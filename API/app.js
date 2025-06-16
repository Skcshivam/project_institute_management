const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const userRoute = require("./routes/user");
const batchRoute = require("./routes/batch");
const studentRoute = require("./routes/student");
const feeRoute = require("./routes/fee");

mongoose
  .connect(
    "mongodb+srv://sbs:1234@sbs.3motym3.mongodb.net/?retryWrites=true&w=majority&appName=sbs"
  )
  .then(() => {
    console.log("connected with database");
  })
  .catch((err) => {
    console.log("err", err);
  });

app.use(bodyParser.json());

app.use(
  fileUpload({
    useTempFiles: true,
    // tempFileDir: "/tmp/",
  })
);

app.use("/user", userRoute);
app.use("/batch", batchRoute);
app.use("/student", studentRoute);
app.use("/fee", feeRoute);

app.use((req, res) => {
  res.status(404).json({
    msg: "bad request",
  });
});

module.exports = app;
