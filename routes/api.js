const bbs = require("./bbs/bbs");
const user = require("./user/user");
const login = require("./user/login");
const signup = require("./user/signup");
const history = require("./bbs/bbshistory");
const express = require("express");

router = express.Router();
router.use("/bbs", bbs);
router.use("/login", login);
router.use("/signup", signup);
router.use("/history", history);
const Auth = (req, res, next) => {
  const user = req.session;
  if (user != undefined) {
    next();
  } else {
    res.send("권한이 없습니다").redirect("/");
  }
};
router.use("/user", Auth, user); //세션부여

module.exports = router;
