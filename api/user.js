const mysql = require("mysql");
const express = require("express");
const secret = require("./password");
//const pwreset = require("./password-reset");
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
router.patch("/pwreset", (req, res) => {
  const target = req.body.userID;
  const password = req.body.userPassword;
  const sql = `UPDATE user SET userPassword = ${password} WHERE userID=${target};`;
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
router.DELETE("/delete", (req, res) => {
  const userPassword = req.body;
  //const session = req.cookies.set-session;
  const sql = `DELETE FROM user WHERE userPassword = ${userPassword}`;
  db.query(sql, function (err, data) {
    if (err) {
      res.status(500).send("Server error");
    } else {
      res.status(200).send("DELETED");
    }
  });
});
// router.post("/", (req, res) => {
//   const userName = req.body.name;
//   const userPassword = req.body.password;
//   const userEmail = req.body.email;
//   const values = [userName, userPassword, userEmail];
//   var sql = "INSERT INTO user(userName,userPassword,userEmail) VALUES(?,?,?);";
//   db.query(sql, values, function (err, result) {
//     if (err) {
//       console.log("error: ", err);
//       res.status(500).send("Server error");
//       return;
//     }
//     console.log("user inserted");
//     res.status(200).send("user inserted");
//   });
// });

module.exports = router;
