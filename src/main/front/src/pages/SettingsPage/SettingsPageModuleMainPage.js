
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import setupStyles from "../stylesModules/setupStyles";
import { getMainPageModules } from "../../components/auth/slices/authSlice";

const SettingsPageModuleMainPage = ()=> {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch()
    const style = setupStyles("mainstyle")
    const handleDispatch = () => {
      
    }

      return (     
        <Link  className={style.item_menu_a} to={"/app/settings/mainpage"}>Конструктор главной страницы</Link>
      );
    }
    export default SettingsPageModuleMainPage;