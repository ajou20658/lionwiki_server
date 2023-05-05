const mysql = require("mysql");
const express = require("express");
const secret = require("./password");
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
  const { userEmail, userPassword } = req.body;
  const sql = `SELECT userID from wikibbs.user WHERE userEmail=${userEmail} and userPassword =${userPassword};`;
  db.query(sql, function (err, data) {
    if (err) {
      res.status(500).send("Server error");
      return;
    } else {
      //console.log(data);
      res.status(200).json(data);
      if (!data) {
        res.json({ message: "회원 정보 없음" });
      }
    }
  });
});

module.exports = router;
