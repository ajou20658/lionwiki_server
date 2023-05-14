import Header from "./Header";
import Footer from "./Footer";
import s from "../styles/mainLayout.module.css";

function MainLayout(props){
    return(
        <div>
            <Header/>
            
            <div className ={s.bgcccc}>
                <div className={s.container}>

                    <div className={s.body}>
                        {props.children}
                    </div>
                    
                    <div className={s.change}>
                        <h3 className={s.changeTitle}>최근 변경</h3>
                        <ul>
                            <li><a href="#">제목</a> <div>[수정 시각]</div></li>
                            <li><a href="#">제목</a> <div>[수정 시각]</div></li>
                            <li><a href="#">제목</a> <div>[수정 시각]</div></li>
                            <li className={s.more}><a>[더보기]</a></li>
                        </ul>
                    </div>

                </div>
            </div>
            
            <Footer/>
        </div>
    )

}
export default MainLayout;