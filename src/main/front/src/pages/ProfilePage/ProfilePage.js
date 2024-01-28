import React from "react";
import styles from "./profile.module.css"
import  stylemenu from "../HomePage/Content/Content.module.css";
import MyTable from "./MyTable";
import CircleMenuItems from "../../components/profile/CircleMenuItems";


const ProfilePage = () => {
 
   const moduleMenu = CircleMenuItems("ProfileInfo", true)
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
       <MyTable/>
       </div>
     
         </div>
        
        </div>
       
      </div>
         );
}
 
export default ProfilePage; 
