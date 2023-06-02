const express = require("express");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const cors = require("cors");
const app = express();
const api = require("./routes/api");
const bodyParser = require("body-parser");
const fs = require("fs");
const PORT = process.env.PORT || 3001;

const sessionStore = new FileStore();
const corsOptions = {
  origin: "http://10.168.65.217:3000",
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

// HTTP 연결이 끊겼을 때 처리
app.use((req, res, next) => {
  // HTTP 연결이 끊겼을 때 처리
  req.on("end", () => {
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
      }
    });
    sessionStore.destroy(req.sessionID, (err) => {
      if (err) {
        console.error(err);
      }
    });
  });
  next();
});
process.on("SIGINT", () => {
  const session_dir = "./sessions";
  fs.readdirSync(session_dir).forEach((file) => {
    fs.unlinkSync(`${session_dir}\\${file}`);
  });
});
app.listen(PORT, () => {
  console.log(`Listening on:http://localhost:${PORT}`);
});
