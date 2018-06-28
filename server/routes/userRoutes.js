const userRoutes = require("express").Router();
const formidable = require("formidable");
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const _filter = { password: 0, __v: 0 };

userRoutes.get("/", (req, res) => {
  res.send("user");
});

userRoutes.post("/login", (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields) => {
    if (err) return console.error(err);
    const { username, password } = fields;
    User.findOne({ username }, (err, existingUser) => {
      if (err) return console.error(err);
      if (!existingUser) {
        return res.json({
          code: 1,
          msg: "username does not exist Please register your account"
        });
      }
      const hash = existingUser.password;
      const { username, _id } = existingUser;
      console.log(hash);
      console.log(username);
      console.log(_id);
      bcrypt.compare(password, hash, (err, match) => {
        if (err) return console.error(err);
        if (match) {
          console.log(`matched`);
          // login successfully and set session
          req.session["userId"] = _id;
          return res.json({ code: 0, existingUser });
        } else {
          // login unsuccessfully
          console.log(`unmatched`);
          res.json({ code: 1, msg: "wrong password" });
        }
      });
    });
  });
});

userRoutes.post("/register", (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields) => {
    if (err) return console.error(err);
    console.log(fields);
    const { username, password, kind } = fields;
    User.findOne({ username }, (err, user) => {
      if (err) return console.error(err);
      if (user) {
        return res.json({
          code: 1,
          msg: "the username you entered already existed Please register again"
        });
      }
      const saltRounds = 10;
      const myPlaintextPassword = password;
      bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
        if (err) return console.error(err);
        User.create({ username, password: hash, kind }, (err, newUser) => {
          if (err) return console.error(err);
          console.log(newUser);
          res.json({ code: 0, newUser });
        });
      });
    });
  });
});

userRoutes.get("/info", (req, res) => {
  const { userId } = req.session;
  if (userId) {
    console.log(userId);
    User.findById(userId, _filter, (err, currentUser) => {
      if (err) return console.error(err);
      if (!currentUser) {
        return res.json({
          code: 1,
          msg: "wrong currentUser Please login again"
        });
      }
      return res.json({ code: 0, currentUser });
    });
  } else {
    return res.json({ code: 1, msg: "No session UserId Please login" });
  }
});

userRoutes.get("/list", (req, res) => {
  User.find({}, (err, users) => {
    if (err) return console.error(err);
    if (!users) return res.json({ code: 1, msg: "no any user in database" });
    return res.json({ code: 0, users });
  });
});

module.exports = userRoutes;
