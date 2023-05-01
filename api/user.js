const mysql = require("mysql");
const express = require("express");
const secret = require("./password");
const db = mysql.createConnection({
  host: secret.host,
  user: secret.user,
  password: secret.password,
  database: secret.database,
});
router = express.Router();
/**
 * userID int
 * userName varchar
 * userPassword varchar
 * userEmail varchar
 */
router.get("/", (req, res) => {
  db.query("SELECT * FROM wikibbs.user", (err, data) => {
    if (err) {
      console.log("db query err");
      res.send(err);
    } else {
      console.log("success");
      res.send(data);
    }
  });
});

router.post("/", (req, res) => {
  const userName = req.body.name;
  const userPassword = req.body.password;
  const userEmail = req.body.email;
  const values = [userName, userPassword, userEmail];
  var sql = "INSERT INTO bbs(userName,userPassword,userEmail) VALUES(?,?,?)";
  db.query(sql, values, function (err, result) {
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
