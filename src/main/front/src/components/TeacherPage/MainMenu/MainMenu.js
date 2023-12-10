import style from './mainmenu.module.css';
import ReactDOM from "react-dom";
import { Link } from 'react-router-dom';

const MainMenu = ()=> {
    return (
        <div className={style.main_menu}>
            <div className={style.main_menu_container}>
            </div>
            <div className={style.main_menu_block}>
            <ul>
                <li><Link to="/journal_teacher" className={style.button}>Журнал</Link></li>
                <li><Link to="/teacher_journal" className={style.button}>Расписание</Link></li>
                <li><Link to="/teacher_journal" className={style.button}>Ученики</Link></li>
                <li><Link to="/teacher_journal" className={style.button}>Телефонная книга</Link></li>
            </ul>
            </div>
        </div>
    );
  }
  
  export default MainMenu;
  