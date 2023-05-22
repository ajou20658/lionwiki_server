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
router.get("/", (req, res) => {
  //const sid = req.headers.cookie.split("=");
  const user = req.session.user;
  const sql = `SELECT * FROM user WHERE userID = '${user}'`;
  db.query(sql, function (err, data) {
    if (err) {
      console.log(err);

      res.status(500).send(err).redirect("/");
      return;
    } else {
      if (data.length > 0) {
        console.log(data);
        res.json(data);
      } else {
        res.status(400).send("이메일 혹은 비밀번호가 일치하지 않습니다");
      }
    }
  });
});

module.exports = router;
