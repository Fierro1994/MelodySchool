
import React, { useState } from "react";
import { MdPhotoCamera } from "react-icons/md";
import { useSelector } from "react-redux";
import setupStyles from "../../stylesModules/setupStyles";

const MomentsModulePhoto = ()=> {

  const style = setupStyles("mainstyle")
      return (     
        <div className={style.item_menu_a} to={""}><MdPhotoCamera className={style.icons}/></div>
      );
    }
    export default MomentsModulePhoto;