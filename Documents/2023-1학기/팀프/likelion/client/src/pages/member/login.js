import s from "../../styles/Wikidoc.module.css";
import MainLayout from "../../components/mainLayout";

function Login(){

    return (
    <MainLayout>
        <div>
            
            <div className={`{${s.header} ${s.loginTitle}` }>
                <div className={`${s.headerContainer}  `}>
                        <h1 className={`${s.title}`}>로그인</h1>
                </div>
            </div>      
                
            <form className={s.loginBody}>   
                <div className={s.loginBodyContainer}>
                <div className={s.loginInput}>
                    <lable for ={s.username}>Username</lable>
                    <input type="text" className={s.username}></input>
                    <label for ={s.password}>Password</label>
                    <input type="password" className={s.password}></input>

                </div>

                <div className={s.loginSecondLine}>
                    
                    <div >
                        <input type="checkbox" className={s.checkbox}></input>
                        <label for={s.checkbox}>자동 로그인</label>
                    </div>
                    <a href="/member/recover">[아이디/비밀번호 찾기]</a>
                </div>

                <div className={s.loginBtn}>
                    <a href="/member/signUp">계정 만들기</a>
                    <button>로그인</button>
                </div>
                </div>
            </form> 
        </div>

    </MainLayout>
    );
}

export default Login;