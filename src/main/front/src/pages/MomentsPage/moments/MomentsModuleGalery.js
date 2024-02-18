
import React, { useState } from "react";
import { useSelector } from "react-redux";
import setupStyles from "../../stylesModules/setupStyles";
import { Link } from "react-router-dom";

const MomentsModuleGalery = ()=> {
  const style = setupStyles("mainstyle")

      return (     
        <Link  className={style.item_menu_a} to={"/app/moments"}>галерея</Link>
      );
    }
    export default MomentsModuleGalery;