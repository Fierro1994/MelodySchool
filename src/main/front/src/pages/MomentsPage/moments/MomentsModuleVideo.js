
import React, { useState } from "react";
import { useSelector } from "react-redux";
import setupStyles from "../../../components/auth/services/setupStyles";
import { Link } from "react-router-dom";

const MomentsModuleVideo = ()=> {
  
  const style = setupStyles("mainstyle")

      return (     
        <Link  className={style.item_menu_a} to={"/app/moments"}>Видео</Link>
      );
    }
    export default MomentsModuleVideo;