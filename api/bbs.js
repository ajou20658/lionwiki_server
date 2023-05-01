const mysql = require("mysql");
const express = require("express");
const secret = require("./secret");
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

router.get("/", (req, res) => {
  db.query("SELECT * FROM wikibbs.bbs", (err, data) => {
    if (err) {
      console.log("db query err");
      res.send(err);
    } else {
      console.log("success");
      res.send(data);
    }
  });
}); //read

router.patch("/", (req, res) => {
  const bbsID = req.body.id;
  const userID = req.body.user;
});
module.exports = router;
