import React from 'react';
import style from "./Content.module.css";


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
                        <form action="#" dataType="json" contentType="aplication/json" method="post">
                            <div className="formsignup"><label> <input type="text" name="username" placeholder="Логин" /> </label></div>
                            <div className="formsignup"><label>  <input type="password" name="password" placeholder="Пароль" /> </label></div>
                            <div><input type="submit" className={style.btn} value="Войти" /></div>
                        </form>
                    </div></div>
                  </div>
              </div>
      );
    }
    export default Content;