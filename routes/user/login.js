const mysql = require("mysql");
const express = require("express");
const secret = require("../secret.json");
const db = mysql.createConnection({
  host: secret.host,
  user: secret.user,
  password: secret.password,
  database: secret.database,
});
/**
 * userID int
 * userName varchar
 * userPassword varchar
 * userEmail varchar
 */
//client -> server : fetch /axios/ajax
//server -> db : sql query

router = express.Router();

router.post("/", (req, res) => {
  const { userid, userPassword } = req.body;
  const sql = `SELECT * FROM user WHERE userid=${userid} AND userPassword = ${userPassword}`;
  db.query(sql, function (err, data) {
    if (err) {
      res.status(500).send("Server error");
      return;
    } else {
      if (data != undefined) {
        req.session.user = { ...data };
        res.redirect("/");
      } else {
        res.send(
          alertMove("아이디 혹은 패스워드가 일치하지 않습니다", "/api/login")
        );
      }
    }
  });
});

module.exports = router;
