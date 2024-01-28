import React from "react";
import styles from "./moments.module.css"
import  stylemenu from "../HomePage/Content/Content.module.css";
import CircleMenuItems from "../../components/profile/CircleMenuItems";
import MyTable from "./MyTable";
import MomentsAddFunc from "./moments/MomentsAddFunc";


const MomentsAddPage = () => {

   const moduleMenu = CircleMenuItems("ProfileModuleMoments", true)
    return (
    <div>
         <div className={styles.container}>
        
         <div className={styles.container2}>
         <div className={stylemenu.menu_items}>
       <div className={styles.circle}>
       {moduleMenu}
         </div>
       </div>
       <div>
     <MomentsAddFunc/>
       </div>
   
         </div>
        
        </div>

      </div>
         );
}
 
export default MomentsAddPage; 
