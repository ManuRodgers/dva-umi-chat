const authRouter = require("express").Router();
const passport = require("passport");

authRouter.get("/", (req, res) => {
  res.json({ code: 0 });
});
// auth with google+
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: "profile" })
);

// callback route for google to redirect to
authRouter.get(
  "/google/redirect",
  passport.authenticate("google"),
  function(err, req, res, next) {
    // custom error handler to catch any errors, such as TokenError
    if (err.name === "TokenError") {
      res.redirect("/auth/google"); // redirect them back to the login page
    } else {
      // Handle other errors here
    }
  },
  (req, res) => {
    console.log(req.user);
    res.json({ code: 0, currentUser: req.user });
  }
);

authRouter.get("/googleInfo", (req, res) => {
  console.log(req.user);
  res.json({ code: 0, currentUser: req.user });
});

module.exports = authRouter;
