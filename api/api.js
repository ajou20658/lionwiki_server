const bbs = require("./bbs");
const user = require("./user");
const mysql = require("mysql");
const express = require("express");

router = express.Router();
router.use("/bbs", bbs);
router.use("/user", user);
router.get("/", (req, res) => {
  res.send("user.js connected");
});
module.exports = router;
