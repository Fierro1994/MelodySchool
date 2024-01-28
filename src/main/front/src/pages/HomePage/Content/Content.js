import style from "./Content.module.css";
import React from "react";
import Login from "../../../components/auth/Login/Login";
import { useSelector } from "react-redux";
import CircleMenuItems from "../../../components/profile/CircleMenuItems";

const Content = () => {

  const auth = useSelector((state) => state.auth);

  const moduleMenu = CircleMenuItems()

  return (
    <>
      <div className={style.content}>
        {auth._id ?
          <div className={style.menu_items}>
            {moduleMenu}
                     </div>
          :
          <div className={style.main}>
            <h2>Добро пожаловать</h2>
            <Login /></div>}


      </div>
    </>
  );
}
export default Content;









