import React, { useState } from "react";
import { useSelector } from "react-redux";
import setupStyles from "../../pages/stylesModules/setupStyles";
import { Link } from "react-router-dom";


const ProfileModuleMomentsAdd = ()=> {
  const style = setupStyles("mainstyle")
      return (     
        <Link className={style.item_menu_a} to={"/app/moments/add"}>Добавить</Link>

      );
    }
    export default ProfileModuleMomentsAdd;