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

router.post("/:title", (req, res) => {
  const title = req.params.title;
  const id = req.session.user;
  const body = req.body.content;
  const values = [1, title, body, new Date(), id];

  //
  var sql2 = "INSERT INTO bbs(title) VALUES(?)";
  db.query(sql2, [title], function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).send("Server error");
    } else {
      console.log("bbs inserted");
    }
  });
  var sql =
    "INSERT INTO doc_version(1,title,body,created_at,user) VALUES(?,?,?,?,?)";
  db.query(sql, values, function (err, result) {
    if (err) {
      console.log("error: ", err);
      res.status(500).send("Server error");
    }
    console.log("doc_version inserted");
    res.status(200).send("doc_version inserted");
  });
}); //create
module.exports = router;
