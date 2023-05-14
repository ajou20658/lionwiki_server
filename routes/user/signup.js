const mysql = require("mysql");
const express = require("express");
const secret = require("../secret.json");
//const pwreset = require("./password-reset");
const db = mysql.createConnection({
  host: secret.host,
  user: secret.user,
  password: secret.password,
  database: secret.database,
});
//crud
router = express.Router();
router.post("/", (req, res) => {
  const userName = req.body.name;
  const userPassword = req.body.password;
  const userEmail = req.body.email;
  const values = [userName, userPassword, userEmail];
  var sql = "INSERT INTO user(userName,userPassword,userEmail) VALUES(?,?,?);";
  db.query(sql, values, function (err, result) {
    res.header("Access-Control-Allow-Origin", "*");
    if (err) {
      console.log("error: ", err);
      res.status(500).send("Server error");
      return;
    }

    console.log("user inserted");
    res.status(200).send("user inserted");
  });
});

module.exports = router;
