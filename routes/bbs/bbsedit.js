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
module.exports = router;
