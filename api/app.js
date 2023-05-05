const express = require("express");
const app = express();
const session = require("express-session");
const api = require("./api");
const bodyParser = require("body-parser");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(
  session({
    secret: "secretkey", //암호화 키
    resave: false,
    saveUninitialized: true,
    cookie: {
      domain: "localhost",
      path: "/",
      maxAge: 1 * 60 * 60 * 24,
      sameSite: "None",
      secure: true,
    },
  })
);

app.get("/", (req, res) => {
  res.send("connected");
});

module.exports = app;

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
