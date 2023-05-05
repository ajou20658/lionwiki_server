const mysql = require("mysql");
const express = require("express");
const secret = require("./password");
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
  console.log(req.body);
  var sql =
    "INSERT INTO bbs(bbsTitle,userID,bbsAvailable,bbsDate,bbsContent) VALUES(?,?,?,?,?);";
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

router.get("/:id", (req, res) => {
  db.query(
    `SELECT * FROM wikibbs.bbs WHERE bbsID = ${req.params.bbsID} AND bbsAvailable = 1;`,
    (err, data) => {
      if (err) {
        console.log("db query err");
        res.send(err);
      } else {
        console.log("success");
        res.send(data);
      }
    }
  );
}); //read
router.get("/", (req, res) => {
  /**ID값은 이후 세션토큰으로 대체필요
   * 유저가 작성한 모든 게시글 조회
   */
  const sql = `SELECT * from wikibbs.bbs WHERE userID=${req.body.userID} AND bbsAvailable = 1;`;
  db.query(sql, function (err, data) {
    if (err) {
      res.status(500).send("Server error");
      return;
    } else {
      //console.log(data);
      res.status(200).json(data);
    }
  });
});
router.patch("/delete/:bbsID", (req, res) => {
  /**삭제 권한 가진 사람이 bbsID에 해당하는게시글 삭제 요청
   * bbsAvailable (1:열람가능,0:열람불가)
   * */
  const target = req.params.bbsID;
  const sql = `UPDATE bbs SET bbsAvailable = 0 WHERE bbsID=${target} AND bbsAvailable = 1;`;
  db.query(sql, function (err, data) {
    if (err) {
      res.status(500).send("Server error");
      return;
    } else {
      //console.log(data);
      res.status(200).send("available changed");
    }
  });
});
router.patch("/update/:bbsID", (req, res) => {
  const bbsID = req.params.bbsID;
  const { bbsContent, bbsTitle } = req.body;
  const values = [bbsTitle, userID, 1, new Date(), bbsContent];
  console.log(req.body);
  var sql = `UPDATE INTO bbs(bbsTitle,userID,bbsAvailable,bbsDate,bbsContent) VALUES(?,?,?,?,?) WHERE bbsID = ${bbsID};`;
  db.query(sql, values, function (err, result) {
    if (err) {
      console.log("error: ", err);
      res.status(500).send("Server error");
      return;
    }
    console.log("bbs updated");
    res.status(200).send("bbs updated");
  });
});
// router.patch("/", (req, res) => {
//   const bbsID = req.param.id;
//   const userID = req.body.user;
// });
module.exports = router;
