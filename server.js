const express = require("express");
const session = require("express-session");
// const MySQLStore = require("express-mysql-session")(session);
const MemoryStore = require("memorystore")(session);
const cors = require("cors");
const app = express();
const api = require("./routes/api");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3001;
// const sessionStore = new MySQLStore({
//   host: "localhost",
//   user: "root",
//   password: "mwy6ad010y**",
//   database: "wikibbs",
// });
const sessionStore = new MemoryStore();
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET, //암호화 키 cmd 에서 set SESSION_SECRET="비밀번호 입력후 사용가능"
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: { secure: false, sameSite: false },
    userID: (req) => req.session.userID,
  })
);
app.use("/api", api);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.get("/", (req, res) => {
  res.send("connected");
});
app.listen(PORT, () => {
  console.log(`Listening on:http://localhost:${PORT}`);
});
