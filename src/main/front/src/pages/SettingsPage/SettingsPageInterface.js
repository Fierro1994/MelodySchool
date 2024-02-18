import React, { useEffect } from "react";
import SettingsMenu from "./SettingsMenu";
import CircleMenuItems from "../../components/profile/CircleMenuItems";
import setupStyles from "../stylesModules/setupStyles";
import { useSelector } from "react-redux";
import Interface from "./Interface";
import CircleSettingsPage from "./CircleSettingsPage";


const SettingsPageInterface = () => {
  const auth = useSelector((state) => state.auth);
  const moduleMenu = CircleSettingsPage("SettingsPageModuleInterface", true)
  const style = setupStyles("mainstyle")
    return (
         <div className={style.container}>
         <div className={style.menu_items}>
       <div className={style.circle}>
       {moduleMenu}
         </div>
       </div>
       <div className={style.container_content}>
        <div className={style.h1style}>
                <h1>Настройки</h1>
            </div>
       <div >
       <Interface/>
       </div>
       <div>
       <SettingsMenu/>
       </div>
       </div>
      
         </div>

         );
}
 
export default SettingsPageInterface; 
