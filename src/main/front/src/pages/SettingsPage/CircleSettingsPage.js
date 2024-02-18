import React, { useState, useEffect, useMemo } from "react";
import setupStyles from "../stylesModules/setupStyles.js";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import SettingsPageModuleBack from "./SettingsPageModuleBack.js"
import SettingsPageModuleInterface from "./SettingsPageModuleInterface.js"
import SettingsPageModuleSecurity from "./SettingsPageModuleSecurity.js"
import SettingsPageModuleMainPage from "./SettingsPageModuleMainPage.js"
import { getMainPageModules } from "../../components/auth/slices/authSlice.js";

function CircleMenuItems(namePage, showSet) {
    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate()
  const srcValue = "data:image/png;base64, " + auth.avatar
  const style = setupStyles("mainstyle")
  const [show, setShow] = useState(showSet)

  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(getMainPageModules(auth._id))
  }, [dispatch]);
  

  const listModuleName = []

  listModuleName.push(<SettingsPageModuleBack />)
  listModuleName.push(<SettingsPageModuleInterface />)
  listModuleName.push(<SettingsPageModuleSecurity />)
  listModuleName.push(<SettingsPageModuleMainPage />)



  const result = listModuleName.map((element, i) => {
    var l = listModuleName.length
    if (element.type.name === namePage) {
      return <span className={style.thisPage} key={i} style={{
        left: (50 - 90 * Math.cos(-0.5 * Math.PI - 2 * (1 / l) * i * Math.PI)).toFixed(4) + "%",
        top: (50 + 90 * Math.sin(-0.5 * Math.PI - 2 * (1 / l) * i * Math.PI)).toFixed(4) + "%"
      }}>{element}</span>
    }
    return <span className={style.span_menu} key={i} style={{
      left: (50 - 90 * Math.cos(-0.5 * Math.PI - 2 * (1 / l) * i * Math.PI)).toFixed(4) + "%",
      top: (50 + 90 * Math.sin(-0.5 * Math.PI - 2 * (1 / l) * i * Math.PI)).toFixed(4) + "%"
    }}>{element}</span>

  });


  return (
    <>

      <div className={style.containermenu}>
      <div className={!show ? style.item : style.item + " " + style.open}>
          <div className={style.item_style}>{result}</div>
        </div>

       

          <img className={style.open_menu} src={srcValue} onClick={function () {
            // onSubmitModule()
            setShow(!show)
          }
          } />

      </div>
       
      
        <div className={style.timeOnline}>{
          auth._id ? "в сети" :
            "Был в сети" + " " + auth.onlineTime}</div>
        <div className={style.profilename}>
          <p>{auth.firstName + " " + auth.lastName}</p>
        </div>
    

    </>

  )
}

export default CircleMenuItems;



