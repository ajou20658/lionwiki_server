const mysql = require("mysql");
const express = require("express");
const secret = require("../secret.json");
const session = require("express-session");
const db = mysql.createConnection({
  host: secret.host,
  user: secret.user,
  password: secret.password,
  database: secret.database,
});
router = express.Router();
const sessionOBJ = {
  secret: process.env.SESSION_SECRET, //암호화 키 cmd 에서 set SESSION_SECRET="비밀번호 입력후 사용가능"
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 1000,
  },
};
router.use(session(sessionOBJ));
router.post("/", (req, res) => {
  const { userEmail, userPassword } = req.body;
  //console.log(userEmail, userPassword);
  const sql = `SELECT * FROM user WHERE userEmail='${userEmail}' AND userPassword = '${userPassword}'`;
  db.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
      return;
    } else {
      //console.log(data);
      if (data.length > 0) {
        req.session.userEmail = userEmail;
        res.cookie("userEmail", userEmail);
        res.redirect("/");
      } else {
        res.status(400).send("이메일 혹은 비밀번호가 일치하지 않습니다");
      }
    }
  });
});

module.exports = router;
