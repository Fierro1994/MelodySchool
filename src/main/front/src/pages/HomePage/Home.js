import React from "react";
import Login from "../../components/auth/Login/Login";
import { useSelector } from "react-redux";
import CircleMenuItems from "../../components/profile/CircleMenuItems";
import Content from "./Content";
import setupStyles from "../stylesModules/setupStyles";
import styledefault from "../stylesModules/BlackTheme/mainstyle.module.css";
const Home = () => {
  const auth = useSelector((state) => state.auth);
  
  const style = setupStyles("mainstyle")
  const moduleMenu = CircleMenuItems("MainModule", true)
 
  return (
    <> {auth._id? 
        <div className={style.container}>
         <div className={style.menu_items}>
       <div className={style.circle}>
               
            {moduleMenu}
            </div>     
          :
        
       </div>
       <div>
       <Content/>
       </div>
       
      </div> :  
      <div className={styledefault.content}>
       <div className={styledefault.main}>
      <h2>Добро пожаловать</h2>
      <Login /></div></div> }
    </>
  );
}
export default Home;
