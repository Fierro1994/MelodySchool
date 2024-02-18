import React, { useState } from "react";
import { useSelector } from "react-redux";
import setupStyles from "../../pages/stylesModules/setupStyles";


const ProfileModuleMessages = ()=> {
  const style = setupStyles("mainstyle")


      return (
              
                     <a className={style.item_menu_a}>Сообщения</a>

      );
    }
    export default ProfileModuleMessages;