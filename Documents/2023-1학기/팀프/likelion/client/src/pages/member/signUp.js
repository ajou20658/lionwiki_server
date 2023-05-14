import s from "../../styles/Wikidoc.module.css";
import MainLayout from "../../components/mainLayout";
import { useState } from "react";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const handleName = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };
  const handlePw = (e) => {
    console.log(e.target.value);
    setPw(e.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const reqData = {
      name: name,
      password: pw,
      email: email,
    };
    fetch("http://localhost:3001/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <MainLayout>
      <div>
        <div className={`{${s.header} ${s.loginTitle}`}>
          <div className={`${s.headerContainer}  `}>
            <h1 className={`${s.title}`}>계정 만들기</h1>
          </div>
        </div>

        <form className={s.loginBody} onSubmit={handleSubmit}>
          <div className={s.loginBodyContainer}>
            <div className={s.loginInput}>
              <label for={s.email}>이메일</label>
              <input
                type="text"
                className={s.email}
                onChange={handleEmail}
              ></input>
              <label for={s.name}>이름</label>
              <input
                type="password"
                className={s.name}
                onChange={handleName}
              ></input>
              <label for={s.password}>비밀번호</label>
              <input
                type="password"
                className={s.password}
                onChange={handlePw}
              ></input>
            </div>

            <div className={s.loginBtn}>
              <button type="submit">인증</button>
            </div>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}

export default SignUp;
