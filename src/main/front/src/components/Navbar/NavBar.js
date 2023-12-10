import React, { useState } from "react";
import style from './Navbar.module.css';
import Logo from "../../assets/logo.png";
import {AiOutlineMenu, AiOutlineClose} from 'react-icons/ai'; 
import Button from '@mui/material/Button';

const NavBar = ()=> {
  const[nav, setNav] = useState(false);
    return (
      <header className={style.header}>
          <div className="container2">
            <div className={style.box}>
              <div className={style.logo_img}>
                <img src={Logo}  alt="/"/>
              </div>
              <ul className={
                nav ? [style.menu, style.active].join(' ') : [style.menu]
                }>
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
      <Button variant="outlined" size="large" href="#contained-buttons">
        Вход
      </Button>
                </li>
              </ul>
              <div onClick={()=> setNav(!nav)} className={style.mobile_btn}>
              {nav ? <AiOutlineClose size={25}/> : <AiOutlineMenu size={25}/>}
              </div>
            </div>
          </div>     
      </header>
      
    );
  }
  
  export default NavBar;
  
      
   

