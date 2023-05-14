const express = require("express");
const session = require("express-session");
const memstore = require("memorystore")(session);
const cors = require("cors");
const app = express();
const api = require("./routes/api");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3001;
// const sessionOBJ = {
//   secret: process.env.SESSION_SECRET, //암호화 키
//   resave: false,
//   saveUninitialized: true,
//   store: new memstore({ checkPeriod: 60 * 1000 }),
//   cookie: {
//     maxAge: 60 * 1000,
//   },
// };
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api", api);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
// app.use(session({ sessionOBJ }));

app.get("/", (req, res) => {
  res.send("connected");
});
app.listen(PORT, () => {
  console.log(`Listening on:http://localhost:${PORT}`);
});

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
