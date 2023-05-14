const bbs = require("./bbs/bbs");
const user = require("./user/user");
const login = require("./user/login");
const signup = require("./user/signup");
// const password = require("./password-reset");
const express = require("express");

router = express.Router();
router.use("/bbs", bbs);
router.use("/login", login);
// router.use("/password-reset", password);
// router.get("/", (req, res) => {
//   let { user } = req.session;
//   res.send("api connected");
// });
router.use("/signup", signup);
router.use("/user", user);
// const Auth = (req, res, next) => {
//   const { user } = req.session;
//   if (user != undefined) {
//     next();
//   } else {
//     res.send(alert("권한이 없습니다")).redirect("/");
//   }
// };
// router.use("/user", Auth, user); //세션부여

module.exports = router;
