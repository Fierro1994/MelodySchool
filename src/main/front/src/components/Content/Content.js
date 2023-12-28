import style from "./Content.module.css";
import React from "react";
import Login from "../auth/Login/Login";
import { useSelector, useDispatch } from "react-redux";


const Content = ()=> {
 
  
  const { accessToken, isLoading, isError, message, isAuthenticated } = useSelector(state => state.auth);
      return (

              <div className={style.content}>
    
                <div className={style.mainContent}>
                    <div className={style.main}>
                        <h2>Добро пожаловать</h2>
                        <h2>в школу</h2>
                        <h1>Melody</h1>
                    </div>
                    <div className={style.container_form}> 
                    {isAuthenticated? <div></div> :  <Login/>}
                     
                    </div>
                  </div>
              </div>
      );
    }
    export default Content;