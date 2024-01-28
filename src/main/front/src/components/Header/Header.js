import React, {useEffect, useState } from "react";
import style from './Headeer.module.css';
import Logo from "../../assets/logo.png";
import {AiOutlineMenu, AiOutlineClose} from 'react-icons/ai'; 
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../components/auth/slices/authSlice";
import verifyToken from "../../components/auth/services/verifyToken";


const Header = ()=> {
  const auth = useSelector((state) => state.auth);



const srcValue = "data:image/png;base64, "+auth.avatar
const dispatch = useDispatch();

const handleSubmit = (e) => {
  e.preventDefault();
  dispatch(logoutUser());
};
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
              {auth.token ? (
               <div> 
                <div className={style.profile_container}>
               <div >
                
                
                </div>
                <div><button className={style.btn} onClick={handleSubmit} >выход</button></div>
                </div>
                </div>
              ) : (
                <div></div>
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
