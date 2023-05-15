const mysql = require("mysql");
const express = require("express");
const secret = require("../secret.json");
const db = mysql.createConnection({
  host: secret.host,
  user: secret.user,
  password: secret.password,
  database: secret.database,
});
//crud
router = express.Router();
router.get("/", (req, res) => {
  const userEmail = req.headers.cookie;
  console.log(userEmail);
  if (!userEmail) {
    res.status(401).send("Unauthorized");
    return;
  }
  console.log(userEmail);
  var sql = `SELECT userName,userPassword,userEmail FROM user WHERE userEmail = ${userEmail};`;
  db.query(sql, function (err, data) {
    if (err) {
      console.log("read error", err);
      res.status(500).send("server error");
      return;
    }
    console.log("user status");
    res.status(200).json(data);
  });
});

module.exports = router;
