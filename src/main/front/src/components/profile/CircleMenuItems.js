import React, { useState, useEffect, useMemo } from "react";
import stylemenu from "./menu.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { getItemsMenu, logoutUser } from '../auth/slices/authSlice';
import ProfileModulePlanner from './ProfileModulePlanner';
import ProfileModuleJournal from './ProfileModuleJournal';
import ProfileModuleContactBook from './ProfileModuleContactBook';
import ProfileInfo from './ProfileInfo';
import ProfileAddModules from './ProfileAddModules';
import ProfileModulePlannerAll from './ProfileModulePlannerAll';
import ProfileModuleMessages from './ProfileModuleMessages';
import ProfileModuleFriends from './ProfileModuleFriends';
import LogoutModule from "./LogoutModule";

function CircleMenuItems() {
    const auth = useSelector((state) => state.auth);
    const srcValue = "data:image/png;base64, "+auth.avatar

    const [show, setShow] = useState(false)

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(logoutUser());
    };

    const onSubmitModule = () => {
        dispatch(getItemsMenu(auth._id))
      }
      var listMenuModules =[]
      const listModuleName = []
      if(localStorage.getItem("menuModules")){
        listMenuModules = JSON.parse(localStorage.getItem("menuModules"))
      }
    
      listMenuModules.forEach(element => {
       
        if (element.isEnabled && element.name === "PLAN_PRIVATE") {
         
          listModuleName.push(<ProfileModulePlanner/>)
        
        }
        if (element.isEnabled && element.name === "PLAN_FOR_ALL") {
         
          listModuleName.push(<ProfileModulePlannerAll/>)
        
        }
        if (element.isEnabled && element.name === "JOURNAL_STUDENT"){
          listModuleName.push(<ProfileModuleJournal/>)
        }
        if (element.isEnabled && element.name === "CONTACT_BOOK"){
          listModuleName.push(<ProfileModuleContactBook/>)
        }
        if (element.isEnabled && element.name === "PROFILE_INFO_STUDENT"){
          listModuleName.push( <ProfileInfo/>)
        }
        if (element.isEnabled && element.name === "MESSAGES"){
          listModuleName.push( <ProfileModuleMessages/>)
        }
        if (element.isEnabled && element.name === "FRIENDS"){
          listModuleName.push( <ProfileModuleFriends/>)
        }
       
      });
      listModuleName.push(<ProfileAddModules/>)
      listModuleName.push(<LogoutModule/>)
 const result = listModuleName.map((element, i) => {
    var l=listModuleName.length
    if(element.type.name === "LogoutModule"){
      return<span className={stylemenu.logout} onClick={handleSubmit}  key={i}  style={{ left: (50 - 100*Math.cos(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%",
      top:  (50 + 100*Math.sin(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%"
  }}>{element}</span>
    }
   
    return<span className={stylemenu.span_menu} key={i}  style={{ left: (50 - 100*Math.cos(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%",
    top:  (50 + 100*Math.sin(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%"
}}>{element}</span>

 });

   
   return (
   <div>
   
   <div className={stylemenu.items}>
   <div className={!show? stylemenu.item : stylemenu.item + " " + stylemenu.open}>
    <div className={stylemenu.item_style}>{result}</div>
</div>

<div>
 
<img className={stylemenu.open_menu} src={srcValue} onClick = {function() {
  onSubmitModule()
  setShow(!show)}
}/>
</div>
<div className={stylemenu.timeOnline}>{
    auth._id? "в сети" :
    "Был в сети" + " " + auth.onlineTime}</div>
<div className={stylemenu.profilename}> 
  <p>{auth.firstName + " " + auth.lastName}</p>
  <p>{auth.roles}</p>
</div>
</div>

</div>

   )
}

export default CircleMenuItems;

    

  