import style from './footer.module.css';
import Logo from "../../assets/logo.png";

const Footer = ()=> {
    return (
      <footer className={style.footer}>
            <div className={style.box}>
              <ul className={style.menu}>
                <li>
                  <a href="/">Главная</a>
                </li>
                <li>
                  <a href="/">Наши преподаватели</a>
                </li>
                <li>
                  <a href="/">Акции</a>
                </li>
                <li>
                  <a href="/">Контакты</a>
                </li>
                <li>
                <img src={Logo}  alt="/"/>
                </li>
              </ul>
            </div>    
      </footer>
      
    );
  }
  
  export default Footer;
  
      
   

