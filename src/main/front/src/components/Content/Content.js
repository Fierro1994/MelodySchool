import style from "./Content.module.css";
import React from "react";
import Login from "../auth/Login";


const Content = ()=> {
      return (

              <div className={style.content}>
    
                <div className={style.mainContent}>
                    <div className={style.main}>
                        <h2>Добро пожаловать</h2>
                        <h2>в школу</h2>
                        <h1>Melody</h1>
                    </div>
                    <div className={style.container_form}> <div className="form-signin">
                      <Login/>
                    </div></div>
                  </div>
              </div>
      );
    }
    export default Content;