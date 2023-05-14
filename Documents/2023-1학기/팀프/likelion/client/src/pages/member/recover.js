import s from "../../styles/Wikidoc.module.css";
import MainLayout from "../../components/mainLayout";

function RecoverPassword(){

    return(
        <MainLayout>
        <div>
            
            <div className={`{${s.header} ${s.loginTitle}` }>
                <div className={`${s.headerContainer}  `}>
                        <h1 className={`${s.title}`}>계정 찾기</h1>
                </div>
            </div>      
                
            <form className={s.loginBody}>   
              <div className={s.loginBodyContainer}>
                    <div className={s.loginInput}>
                        <lable for ={s.email}>이메일</lable>
                        <input type="text" className={s.email}></input>
                    </div>

                
                    <div className={s.loginBtn}>
                        
                        <button>찾기</button>
                    </div>
              </div>
            </form> 
        </div>

    </MainLayout>
    );
}

export default RecoverPassword;