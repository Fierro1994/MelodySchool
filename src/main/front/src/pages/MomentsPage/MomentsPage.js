import React from "react";
import CircleMenuItems from "../../components/profile/CircleMenuItems";
import MyTable from "./MyTable";
import { useSelector } from "react-redux";
import setupStyles from "../stylesModules/setupStyles";


const MomentsPage = () => {
  const style = setupStyles("mainstyle")
   const moduleMenu = CircleMenuItems("ProfileModuleMoments", true)
    return (
    <div>
         <div className={style.container}>
        
         <div className={style.container2}>
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

      </div>
         );
}
 
export default MomentsPage; 
