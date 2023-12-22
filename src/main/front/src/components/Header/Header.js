import React, { useState } from "react";
import style from './Headeer.module.css';
import styled from "styled-components";
import Logo from "../../assets/logo.png";
import {AiOutlineMenu, AiOutlineClose} from 'react-icons/ai'; 
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../slices/authSlice";
import { toast } from "react-toastify";
import { resetRegistered, login, getUser } from "../slices/authSlice";

const Header = ()=> {
  const { loading, isAuthenticated, registered, isError, message, isSuccess } =
    useSelector((state) => state.user);
  const[nav, setNav] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  console.log(auth);
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
