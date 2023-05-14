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
//crud
router = express.Router();
const sessionOBJ = {
  secret: process.env.SESSION_SECRET, //암호화 키 cmd 에서 set SESSION_SECRET="비밀번호 입력후 사용가능"
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 60 * 1000,
  },
};
router.use(session(sessionOBJ));
//d 삭제는 게시글 삭제? 혹은 게시글 소유자 변경필요
// router.DELETE("/delete", (req, res) => {
//   const userPassword = req.body;
//   //const session = req.cookies.set-session;
//   const sql = `DELETE FROM user WHERE userPassword = ${userPassword}`;
//   db.query(sql, function (err, data) {
//     if (err) {
//       res.status(500).send("Server error");
//     } else {
//       res.status(200).send("DELETED");
//     }
//   });
// });
//c
router.get("/", (req, res) => {
  const userEmail = req.session.userEmail;
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
