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
  const body = req.body.body;
  const values = [1, title, body, id];
  console.log(req.body);
  var sql =
    "INSERT INTO doc_version(bbsAvailable,title,body,user) VALUES(?,?,?,?)";
  db.query(sql, values, function (err, result) {
    if (err) {
      console.log("error: ", err);
      res.status(500).send("Server error");
      return;
    }
	  console.log(result);
    console.log("bbs inserted");
    res.status(200).send("bbs inserted");
  });
}); //create
module.exports = router;
