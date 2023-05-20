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
router.get("/", (req, res) => {
  const userID = req.session.userID;
  console.log(req.session);
  console.log(req.session.userID);
  const sid = userID ? userID.split("=")[1] : null;
  if (!sid) {
    res.status(401).send("Unauthorized");
    return;
  }
  sessionStore.get(sid, (err, sessionData) => {
    if (err) {
      console.log("session error", err);
      res.status(500).send("server error");
      return;
    }
    if (!sessionData || !sessionData.userID) {
      res.status(401).send("Unauthorized");
      return;
    }
    const userID = sessionData.userID;
    var sql = `SELECT userName,userPassword,userEmail FROM user WHERE userEmail = ${userID};`;
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
});

module.exports = router;
