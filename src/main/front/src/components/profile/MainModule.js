
import React, { useState } from "react";
import { useSelector } from "react-redux";
import setupStyles from "../../pages/stylesModules/setupStyles";
import { Link } from "react-router-dom";


const MainModule = ()=> {
  const style = setupStyles("mainstyle")

      return (     
        <Link  className={style.item_menu_a} to={"/"}>Главная</Link>

      );
    }
    export default MainModule;