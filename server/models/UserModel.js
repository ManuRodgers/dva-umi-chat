const mongoose = require("mongoose");
const UserScheme = new mongoose.Schema({
  // required
  username: { type: String, required: true },
  password: { type: String },
  kind: { type: String },
  avatar: { type: String },
  // boss
  company: { type: String },
  money: { type: String },
  description: { type: String },
  title: { type: String },
  // genius
  salary: { type: String },
  profile: { type: String },
  job: { type: String },
  googleId: { type: String }
});

const UserModel = mongoose.model("user", UserScheme);
module.exports = UserModel;
