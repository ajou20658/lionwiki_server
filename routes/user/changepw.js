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
router.post("/", (req, res) => {
  //const userID = req.session.userID;
	const userPassword = req.body.password;
  const userEmail = req.body.email;
  const values = [userPassword, userEmail];
  var sql = "UPDATE user SET userPassword = ? WHERE userEmail = ? AND userID = ?;";
  db.query(sql, values, function (err, result) {
    if (err) {
      console.log("error: same data user exists");
      res.status(500).json({ error: "Not exist" });
      return;
    }

    console.log(`user ${userID} pw changed to ${userPassword}`);
    res.status(200).json({ message: "user inserted" });
  });
});

module.exports = router;
