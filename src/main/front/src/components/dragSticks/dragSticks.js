// import React from "react";
// import style from "./dragsticks.module.css";
// import { useSelector } from "react-redux";



// function CircleMenuItems(namePage, showSet) {
//     const auth = useSelector((state) => state.auth);
//     var listSticks = []

//   const listModuleName = []
//   if (localStorage.getItem("menuModules")) {
//     listMenuModules = JSON.parse(localStorage.getItem("menuModules"))
//   }
//   listModuleName.push(<MainModule />)
//   listMenuModules.forEach(element => {
  
//     if (element.isEnabled && element.name === "MOMENTS") {
//       listModuleName.push(<ProfileModuleMoments />)
//     }
//     if (element.isEnabled && element.name === "PROFILE_INFO") {
//       listModuleName.push(<ProfileInfo />)
//     }
//     if (element.isEnabled && element.name === "MESSAGES") {
//       listModuleName.push(<ProfileModuleMessages />)
//     }
//     if (element.isEnabled && element.name === "FRIENDS") {
//       listModuleName.push(<ProfileModuleFriends />)
//     }

//   });
//   listModuleName.push(<ProfileAddModules />)
//   listModuleName.push(<LogoutModule />)


//   const result = listModuleName.map((element, i) => {
//     var l = listModuleName.length
//     if (element.type.name === "LogoutModule") {
//       return <span className={stylemenu.logout} onClick={handleSubmit} key={i} style={{
//         left: (50 - 100 * Math.cos(-0.5 * Math.PI - 2 * (1 / l) * i * Math.PI)).toFixed(4) + "%",
//         top: (50 + 100 * Math.sin(-0.5 * Math.PI - 2 * (1 / l) * i * Math.PI)).toFixed(4) + "%"
//       }}>{element}</span>
//     }
//     if (element.type.name === "ProfileModuleMoments"){
//       if(element.type.name === namePage){
//         return <span className={stylemenu.moments + " " + stylemenu.thisPage} onClick={storiesOpen} key={i} style={{
//           left: (50 - 100 * Math.cos(-0.5 * Math.PI - 2 * (1 / l) * i * Math.PI)).toFixed(4) + "%",
//           top: (50 + 100 * Math.sin(-0.5 * Math.PI - 2 * (1 / l) * i * Math.PI)).toFixed(4) + "%"
//         }}>{element}
//          <span className={stylemenu.moments_add} style={{
//           marginLeft: "-11.3vw",
//           marginTop: "11.5vw"
//           }}>
//           <ProfileModuleMomentsArhiv/>
//         </span>
//         <span className={stylemenu.moments_add} style={{
//           marginLeft: "11.5vw",
//           marginTop: "11.5vw"
//           }}>
//           <ProfileModuleMomentsAdd/>
//         </span>
//         </span>
//       }
//       return <span className={stylemenu.moments} onClick={storiesOpen} key={i} style={{
//         left: (50 - 100 * Math.cos(-0.5 * Math.PI - 2 * (1 / l) * i * Math.PI)).toFixed(4) + "%",
//         top: (50 + 100 * Math.sin(-0.5 * Math.PI - 2 * (1 / l) * i * Math.PI)).toFixed(4) + "%"
//       }}>{element}</span>
//     } 
//     if (element.type.name === namePage) {
//       return <span className={stylemenu.thisPage} key={i} style={{
//         left: (50 - 100 * Math.cos(-0.5 * Math.PI - 2 * (1 / l) * i * Math.PI)).toFixed(4) + "%",
//         top: (50 + 100 * Math.sin(-0.5 * Math.PI - 2 * (1 / l) * i * Math.PI)).toFixed(4) + "%"
//       }}>{element}</span>
//     }

//     return <span className={stylemenu.span_menu} key={i} style={{
//       left: (50 - 100 * Math.cos(-0.5 * Math.PI - 2 * (1 / l) * i * Math.PI)).toFixed(4) + "%",
//       top: (50 + 100 * Math.sin(-0.5 * Math.PI - 2 * (1 / l) * i * Math.PI)).toFixed(4) + "%"
//     }}>{element}</span>

//   });


//   return (
//     <div>

//       <div className={stylemenu.items}>
//         <div className={!show ? stylemenu.item : stylemenu.item + " " + stylemenu.open}>
//           <div className={stylemenu.item_style}>{result}</div>
//         </div>

//         <div>

//           <img className={stylemenu.open_menu} src={srcValue} onClick={function () {
//             onSubmitModule()
//             setShow(!show)
//           }
//           } />
//         </div>
//         <div className={stylemenu.timeOnline}>{
//           auth._id ? "в сети" :
//             "Был в сети" + " " + auth.onlineTime}</div>
//         <div className={stylemenu.profilename}>
//           <p>{auth.firstName + " " + auth.lastName}</p>
//           <p>{auth.roles}</p>
//         </div>
//       </div>

//     </div>

//   )
// }

// export default CircleMenuItems;



