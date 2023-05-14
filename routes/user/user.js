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
/**
 * userID int
 * userName varchar
 * userPassword varchar
 * userEmail varchar
 */
//아이디 찾기 - body에 이메일 넣어서 보내기
router.get("/idfind", (req, res) => {
  //console.log(req.params);
  const email = req.body.email;
  const sql = `SELECT userID from user WHERE userEmail=${email};`;
  db.query(sql, function (err, data) {
    if (err) {
      res.status(500).send("Server error");
      return;
    } else {
      //console.log(data);
      //아이디만 출력하게 변경필요
      res.status(200).json(data);
    }
  });
});
// router.get("/usercheck_for_pwreset", (req, res) => {
//   const id = req.body.userID;
//   const name = req.body.userName;
//   const sql = `SELECT userID from user WHERE userName=${name} AND userID = ${id};`;
//   db.query(sql, function (err, data) {
//     if (err) {
//       res.status(500).send("Server error");
//       return;
//     } else {
//       //console.log(data);
//       //유저 한테 비번초기화 가능한 세션 이메일로 보내주기
//       //현재는 임시로 초기화 페이지로 리다이렉션 해주기
//       res.status(200).json(data);
//     }
//   });
// });
//u
router.patch("/pwreset", (req, res) => {
  const target = req.body.userID;
  const changepassword = req.body.userChangepw;
  const sql = `UPDATE user SET userPassword = ${changepassword} WHERE userID=${target};`;
  db.query(sql, function (err, data) {
    if (err) {
      res.status(500).send("Server error");
      return;
    } else {
      console.log(data);
      res.status(200).send("password changed");
    }
  });
});
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
  const userID = req.body.userID;
  var sql = `SELECT userName,userPassword,userEmail FROM user WHERE userID = ${userID};`;
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
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    req.session;
  });
  console.log(req.session);
  res.send(alert("로그아웃 되었습니다")).redirect("/");
});
module.exports = router;
