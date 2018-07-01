const express = require("express");
const mongoose = require("mongoose");

const expressSession = require("express-session");
const passportSetup = require("./config/passport-setup");
const passport = require("passport");
const keys = require("./config/keys");
const uuidv1 = require("uuid/v1");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
mongoose
  .connect(keys.MongoDB.URL)
  .then(() => {
    console.log(`MongoDB connected successfully`);
  })
  .catch(err => {
    console.error(err);
  });
const app = express();

app.set("trust proxy", 1); // trust first proxy
const sess = {
  secret: keys.Session.key,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 20
  },
  genid: function(req) {
    return uuidv1(); // use UUIDs for session IDs
  }
};

if (app.get("env") === "production") {
  app.set("trust proxy", 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}
app.use(expressSession(sess));

// passport session
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("you suck manu tim tony");
});

app.use("/user", userRoutes);
app.use("/auth", authRoutes);

app.listen(9093, () => {
  console.log(`node server is running on port 9093`);
});
