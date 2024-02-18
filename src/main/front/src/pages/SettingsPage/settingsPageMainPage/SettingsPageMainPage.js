import React from "react";
import setupStyles from "../../stylesModules/setupStyles";
import CircleSettingsPage from "../CircleSettingsPage";
import MainPageSetHeader from "./MainPageSetHeader";
import MainPageSetNav from "./MainPageSetNav";
import MainPageSetActual from "./MainPageSetActual";
import MainPageSetPromo from "./MainPageSetPromo";
import MainPageSetContent from "./MainPageSetContent";
import MainPageSetInfo from "./MainPageSetInfo";


const SettingsPageMainPage = () => {
  const moduleMenu = CircleSettingsPage("SettingsPageModuleMainPage", true)
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
                <h1>Главная страница</h1>
            </div>
       <div>
     
       <MainPageSetPromo/>
     
       <MainPageSetHeader/>
       <MainPageSetActual/>
       <MainPageSetNav/>

       <MainPageSetContent/>
       
       </div>
     
       </div>
      
         </div>

         );
}
 
export default SettingsPageMainPage; 
