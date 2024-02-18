import React, { useState } from "react";
import MyTable from "./MyTable";
import CircleMenuItems from "../../components/profile/CircleMenuItems";
import { useSelector } from "react-redux";
import setupStyles from "../stylesModules/setupStyles";


const ProfilePage = () => {
  const moduleMenu = CircleMenuItems("ProfileInfo", true)
  const style = setupStyles("mainstyle")
    return (
    <div>
         <div className={style.container}>
         <div className={style.menu_items}>
       <div className={style.circle}>
       {moduleMenu}
         </div>
       </div>
       <div>
       <MyTable/>
       </div>
     
     
        
        </div>
       
      </div>
         );
}
 
export default ProfilePage; 
