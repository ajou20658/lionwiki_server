import MainLayout from "../../components/mainLayout";
import s from "../../styles/Wikidoc.module.css";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";

function WikiDocHistory(){

    const {title} = useParams();
   

    return(
       
        <MainLayout>
        <div>
        <div className={s.header}>
          <div className={s.headerContainer}>
                <h1 className={s.title}>[호랑이] (문서 역사)</h1>
            
            <div>
                <div className={s.buttonContainer}>
                    <a href= {'/edit/' + {title}.title} id={s.buttonFirst}> 편집 </a>
                    <a>토론</a>
                    <a href ={'/history/'+{title}.title}id={s.buttonLast}>문서 역사</a>

                </div>
                <div className={s.time}>최근 수정 시각</div>
            </div>
          </div>
        </div>
            
            <ul className={s.historyList}>
                <li>[문서 생성 시간][버전 이름] <a>보기</a></li>
                <li>[문서 생성 시간][버전 이름] <a>보기</a></li>
                <li>[문서 생성 시간][버전 이름] <a>보기</a></li>
            </ul>
        
        
        </div>
        </MainLayout>

    )
}

export default WikiDocHistory;