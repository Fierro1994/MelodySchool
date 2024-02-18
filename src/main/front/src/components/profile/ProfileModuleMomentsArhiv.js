import React, { useState } from "react";
import { useSelector } from "react-redux";
import setupStyles from "../../pages/stylesModules/setupStyles";
import { Link } from "react-router-dom";


const ProfileModuleMomentsArhiv = ()=> {
  const style = setupStyles("mainstyle")
      return (     
        <Link className={style.item_menu_a} to={"/"}>Архив</Link>

      );
    }
    export default ProfileModuleMomentsArhiv;