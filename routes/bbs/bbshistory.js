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
  const sql = "SELECT * FROM doc_version WHERE Title = ? AND bbsAvailable = 1";
  const values = [bbsTitle];
  console.log(bbsTitle);
  db.query(sql, values, function (err, result) {
    if (err) {
      console.error(err);
      res.status(500).send("Server Error");
    } else {
      console.log(result);
      var dataList =[];
	    for(var  data of result){
		    dataList.push(data);
	    };
	res.json(dataList);
    }
  });
});
module.exports = router;
