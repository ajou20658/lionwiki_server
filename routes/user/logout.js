const express = require("express");
const session = require("express-session");

//crud
router = express.Router();
const sessionOBJ = {
  secret: process.env.SESSION_SECRET, //암호화 키 cmd 에서 set SESSION_SECRET="비밀번호 입력후 사용가능"
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 60 * 1000,
  },
};
router.use(session(sessionOBJ));
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "세션 종료 오류 발생" });
    } else {
      res.clearCookie("connect.sid");
      res.status(200).json({ message: "로그아웃 되었습니다" }).redirect("/");
    }
  });
});

module.exports = router;
