const bbs = require("./bbs");
const user = require("./user");
const login = require("./login");
// const password = require("./password-reset");
const express = require("express");

router = express.Router();
router.use("/bbs", bbs);
router.use("/user", user);
router.use("/login", login);
// router.use("/password-reset", password);
router.get("/", (req, res) => {
  res.send("user.js connected");
});
module.exports = router;
