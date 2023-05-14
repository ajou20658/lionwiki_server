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
  const bbsTitle = req.body.title;
  const userID = req.body.user;
  const bbsContent = req.body.content;
  const values = [bbsTitle, userID, 1, new Date(), bbsContent];
  var sql =
    "INSERT INTO bbs(bbsTitle,userID,bbsAvailable,bbsDate,bbsContent) VALUES(?,?,?,?,?)";
  db.query(sql, values, function (err, result) {
    if (err) {
      console.log("error: ", err);
      res.status(500).send("Server error");
      return;
    }
    console.log("bbs inserted");
    res.status(200).send("bbs inserted");
  });
}); //create

// router.get("/", (req, res) => {
//   db.query("SELECT * FROM wikibbs.bbs", (err, data) => {
//     if (err) {
//       console.log("db query err");
//       res.send(err);
//     } else {
//       console.log("success");
//       res.status(200).json(data);
//     }
//   });
// }); //read
// router.get("/", (req, res) => {
//   const bbsID = req.body.bbsID;
//   const sql = `SELECT * FROM bbs WHERE bbsID = ${bbsID}`;
//   db.query(sql, function (err, data) {
//     if (err) {
//       res.status(500).send("Server Err");
//     } else {
//       res.status(200).json(data);
//     }
//   });
// });
router.get("/:title", (req, res) => {
  const bbsTitle = req.params.title;
  const sql = "SELECT * FROM wikibbs.bbs WHERE bbsTitle = ?";
  const values = [bbsTitle];
  console.log(bbsTitle);
  db.query(sql, values, function (err, data) {
    if (err) {
      console.error(err);
      res.status(500).send("Server Error");
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

router.patch("/", (req, res) => {
  const { bbsID, bbsTitle, userID, bbsContent } = req.body;
  var sql = `UPDATE bbs SET bbsTitle = ${bbsTitle} AND userID = ${userID} AND bbsContent = ${bbsContent} WHERE bbsID=${bbsID};`;
  db.query(sql, function (err, data) {
    if (err) {
      console.log("patch err");
      res.status(500);
    } else {
      console.log(data.json());
      res.status(200);
    }
  });
});

router.patch("/deletebbs", (req, res) => {
  const bbsID = req.body.bbsID;
  var sql = `UPDATE bbs SET bbsAvailable = 0 WHERE userID=${bbsID};`;
});
module.exports = router;
