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
  const bbsId = req.query.id;
  console.log(req.query);
  let sql = "SELECT * FROM doc_version WHERE title = ? AND bbsAvailable = 1 ORDER BY id DESC LIMIT 1";
  let values = [bbsTitle];
  if(bbsId){
  	sql = "SELECT * FROM doc_version WHERE title = ? AND bbsAvailable =1 AND id = ? ORDER BY id DESC LIMIT 1";
	values.push(bbsId);
  }
  console.log(sql);
  db.query(sql, values, function (err, data) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "db empty" });
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
