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

router.get("/:title", (req, res) => {
  const bbsTitle = req.params.title;
  const sql =
    "SELECT * FROM doc_version WHERE title = ? ORDER BY id DESC LIMIT 1";
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

router.patch("/deletebbs", (req, res) => {
  const bbsID = req.body.bbsID;
  var sql = `UPDATE bbs SET bbsAvailable = 0 WHERE userID=${bbsID};`;
});

module.exports = router;
