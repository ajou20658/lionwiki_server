const express = require("express");
const app = express();
const api = require("./api");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api);

app.get("/", (req, res) => {
  res.send("connected");
});

module.exports = app;

/**
 * bbsID(int) : 게시글 번호
 * bbsTitle(varchar) : 게시글 제목
 * userID(int) : 게시글 작성한 사람 id
 * bbsAvailable(varchar) =>인트로 수정예정 : 게시글 열람가능 여부
 * bbsDate(datetime) : 게시글 작성 날짜
 * bbsContent(varchar) : 게시글 내용
 */

/** 참고사항
 * 해당 버전에는 body-parser가 express안에 내장되어있음
 * 오류가 발생 시 body-parser install 후 수정필요
 * req : req요청값 body안에 들어있음 -> body-parser로 분리
 * res : json형식으로 주로 리턴 {"name":"value"}
 */
/**
 * 불러올 때는
 * let reqOption={
 *  method : "get",
 *  headers : {
 *      "content-type" : "application/json"
 *  }
 * }
 * fetch("/api/bbs",reqOption).then((res)=>res.json())
 * .then(data=> console.log(data));
 * 사용
 */