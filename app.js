const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer();
const user = require("./routes/user.route");
const character = require("./routes/characters.route");
const comment = require("./routes/comments.route");
const signS3 = require("./routes/sign-s3.route");
const passport = require("passport");
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Cache-Control"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

const mongoose = require("mongoose");
let dev_db_url = process.env.MONGODB_URI;
mongoose
  .connect(
    dev_db_url,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("connected to mongo");
  })
  .catch(() => {
    console.log("error");
  });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(passport.initialize());
app.use(upload.single("image"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use("/characters", character);
app.use("/users", user);
app.use("/comments", comment);
app.use("/sign-s3", signS3);

const port = process.env.PORT || 1234;



app.listen(port, () => {
  console.log("Server is up and running on port number" + port);
});
