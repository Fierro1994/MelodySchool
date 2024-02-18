import React, { useEffect, useState } from "react";

import MomentsAddFunc from "./moments/MomentsAddFunc";
import setupStyles from "../stylesModules/setupStyles";


const MomentsAddPage = () => {
const style = setupStyles("mainstyle")
   
  
   const videoRecord = MomentsAddFunc();
    return (
    <div>
         <div className={style.container}>
        
         <div className={style.container2}>
         <div className={style.menu_items}>
       <div className={style.circle}>
         </div>
       </div>
       <div>
       {videoRecord}
       </div>
   
         </div>
        
        </div>

      </div>
         );
}
 
export default MomentsAddPage; 
