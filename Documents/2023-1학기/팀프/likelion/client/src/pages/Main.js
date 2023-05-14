import MainLayout from "../components/mainLayout";
import s from "../styles/Wikidoc.module.css";

function Main(){
  
  const params = "대문";
  
  return(

      
       
        <MainLayout>
      <div>

        <div className={s.header}>
          <div className={s.headerContainer}>

            <h1 className={s.title}>멋사위키 대문</h1>

            <div className={s.buttonContainer}>
              <a href= {'/edit/' + params} id={s.buttonFirst}> 편집 </a>
              
              <a href="#">토론</a>
              <a href ={'/history/'+params}id={s.buttonLast}>문서 역사</a>
            </div>

          </div>

        </div>
          
        <div className={s.body}>
          <div>멋사 위키에 오신 걸 환영합니다~</div>
        </div>

      </div>
        </MainLayout>
        
    )
}

export default Main;