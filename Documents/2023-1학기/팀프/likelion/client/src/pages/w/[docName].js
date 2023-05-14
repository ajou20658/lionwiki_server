import MainLayout from "../../components/mainLayout";
import s from "../../styles/Wikidoc.module.css";
import { useParams } from "react-router-dom";


function WikiDoc(){

  const {title} = useParams();


    return(
        <MainLayout>
        <div>

        <div className={s.header}>
          <div className={s.headerContainer}>
            <h1 className={s.title}>[문서이름]</h1>

            <div>
              <div className={s.buttonContainer}>
                <a href= {'/edit/' + {title}.title} id={s.buttonFirst}> 편집 </a>
                <a>토론</a>
                <a href ={'/history/'+{title}.title}id={s.buttonLast}>문서 역사</a>
              </div>

              <div className={s.time}>
                최근 수정 시각
              </div>

            </div>

          </div>
        </div>
          
          <div className={s.body}>[본문]</div>

        </div>  
        </MainLayout>

    )
}

export default WikiDoc;