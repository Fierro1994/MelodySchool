import React, { useState, useEffect, useMemo } from "react";
import setupStyles from "../../pages/stylesModules/setupStyles";
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../auth/slices/authSlice';
import ProfileModuleMoments from './ProfileModuleMoments';
import ProfileInfo from './ProfileInfo';
import ProfileAddModules from './ProfileAddModules';
import ProfileModuleMessages from './ProfileModuleMessages';
import ProfileModuleFriends from './ProfileModuleFriends';
import LogoutModule from "./LogoutModule";
import ProfileModuleMomentsAdd from "./ProfileModuleMomentsAdd";
import ProfileModuleMomentsArhiv from "./ProfileModuleMomentsArhiv";
import MainModule from "./MainModule";
import { useNavigate } from "react-router-dom";

function CircleMenuItems(namePage, showSet) {
    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate()
  const srcValue = "data:image/png;base64, " + auth.avatar
  const style = setupStyles("mainstyle")
  const [show, setShow] = useState(showSet)

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/")
    dispatch(logoutUser());
  };

  const storiesOpen = () => {
  }
  var listMenuModules = []

  const listModuleName = []
  if (localStorage.getItem("menuModules")) {
    listMenuModules = JSON.parse(localStorage.getItem("menuModules"))
  }
  listModuleName.push(<MainModule />)
  listMenuModules.forEach(element => {
  
    if (element.isEnabled && element.name === "MOMENTS") {
      listModuleName.push(<ProfileModuleMoments />)
    }
    if (element.isEnabled && element.name === "PROFILE_INFO") {
      listModuleName.push(<ProfileInfo />)
    }
    if (element.isEnabled && element.name === "MESSAGES") {
      listModuleName.push(<ProfileModuleMessages />)
    }
    if (element.isEnabled && element.name === "FRIENDS") {
      listModuleName.push(<ProfileModuleFriends />)
    }

  });
  listModuleName.push(<ProfileAddModules />)
  listModuleName.push(<LogoutModule />)


  const result = listModuleName.map((element, i) => {
    var l = listModuleName.length
    if (element.type.name === "LogoutModule") {
      return <span className={style.logout} onClick={handleSubmit} key={i} style={{
        left: (50 - 90 * Math.cos(-0.5 * Math.PI - 2 * (1 / l) * i * Math.PI)).toFixed(4) + "%",
        top: (50 + 90 * Math.sin(-0.5 * Math.PI - 2 * (1 / l) * i * Math.PI)).toFixed(4) + "%"
      }}>{element}</span>
    }
    if (element.type.name === "ProfileModuleMoments"){
      if(element.type.name === namePage){
        return <span className={style.moments + " " + style.thisPage} onClick={storiesOpen} key={i} style={{
          left: (50 - 90 * Math.cos(-0.5 * Math.PI - 2 * (1 / l) * i * Math.PI)).toFixed(4) + "%",
          top: (50 + 90 * Math.sin(-0.5 * Math.PI - 2 * (1 / l) * i * Math.PI)).toFixed(4) + "%"
        }}>{element}
         <span className={style.moments_add} style={{
          marginLeft: "-11.3vw",
          marginTop: "11.5vw"
          }}>
          <ProfileModuleMomentsArhiv/>
        </span>
        <span className={style.moments_add} style={{
          marginLeft: "11.5vw",
          marginTop: "11.5vw"
          }}>
          <ProfileModuleMomentsAdd/>
        </span>
        </span>
      }
      return <span className={style.moments} onClick={storiesOpen} key={i} style={{
        left: (50 - 90 * Math.cos(-0.5 * Math.PI - 2 * (1 / l) * i * Math.PI)).toFixed(4) + "%",
        top: (50 + 90 * Math.sin(-0.5 * Math.PI - 2 * (1 / l) * i * Math.PI)).toFixed(4) + "%"
      }}>{element}</span>
    } 
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



