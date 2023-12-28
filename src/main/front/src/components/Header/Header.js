import React, {useEffect, useState } from "react";
import style from './Headeer.module.css';
import Logo from "../../assets/logo.png";
import {AiOutlineMenu, AiOutlineClose} from 'react-icons/ai'; 
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import verifyToken from "../auth/veerifyToken";
import { logoutUserRed } from "../slices/authSlice";


const Header = ()=> {
  const { accessToken, isLoading, isError, message, isAuthenticated } = useSelector(state => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    
})
 
if(accessToken){
  verifyToken(accessToken)
}

  const[nav, setNav] = useState(false);
 
    return (
      <header className={style.header}>
          <div className="container2">
            <div className={style.box}>
              <div className={style.logo_img}>
               <a href="/"><img src={Logo}  alt="/"/></a> 
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
                <div className="ms-auto">
              {accessToken ? (
               <div>залогинен</div>
              ) : (
                <div>не залогинен</div>
              )}
            </div>  
              
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
  
  export default Header;
