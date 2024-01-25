import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import style from "../HomePage/Content/Content.module.css";
import { useSelector } from "react-redux";
import Register from "../../components/auth/registerModule/registerModule";

const RegisterPage = () => {
    const auth = useSelector((state) => state.auth);
    return (
        <>
        <Header/>
        <div className={style.content}>
        <div className={style.mainContent}>
            <div className={style.main}>
                <h2>Регистрация пользователя</h2>

            </div>
           <Register/>
            </div>     
      </div>
      </>
         );
}
export default RegisterPage;


