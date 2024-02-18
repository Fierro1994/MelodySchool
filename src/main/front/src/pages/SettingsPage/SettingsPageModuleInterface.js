
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import setupStyles from "../stylesModules/setupStyles";

const SettingsPageModuleInterface = ()=> {
    const style = setupStyles("mainstyle")

      return (     
        <Link  className={style.item_menu_a} to={"/app/settings/interface"}>Интерфейс</Link>
      );
    }
    export default SettingsPageModuleInterface;