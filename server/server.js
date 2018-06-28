const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const expressSession = require("express-session");
const keys = require("./config/keys");
mongoose.connect(
  keys.MongoDB.URL,
  () => {
    console.log(`MongoDB connect successfully`);
  }
);
const app = express();

app.use(
  expressSession({
    secret: keys.Session.key,
    resave: false,
    saveUninitialized: true
  })
);

app.get("/", (req, res) => {
  res.send("you suck manu tim tony");
});

app.use("/user", userRoutes);

app.listen(9093, () => {
  console.log(`node server is running on port 9093`);
});
