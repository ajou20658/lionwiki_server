const mysql = require("mysql");
const express = require("express");
const secret = require("../secret.json");
const db = mysql.createConnection({
  host: secret.host,
  user: secret.user,
  password: secret.password,
  database: secret.database,
});
router = express.Router();

router.post("/", (req, res) => {
  const { userEmail, userPassword } = req.body;

  if (req.session.userEmail != undefined) {
    console.log("already login");
  }
  //console.log(userEmail, userPassword);
  const sql = `SELECT userID FROM user WHERE userEmail='${userEmail}' AND userPassword = '${userPassword}'`;
  db.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
      return;
    } else {
      if (data.length > 0) {
        console.log(data);
        req.session.userID = data.userID;
        res.redirect("/");
      } else {
        res.status(400).send("이메일 혹은 비밀번호가 일치하지 않습니다");
      }
    }
  });
});

module.exports = router;
