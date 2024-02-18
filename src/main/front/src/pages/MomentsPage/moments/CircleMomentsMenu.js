import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from 'react-redux';
import MomentsModuleBack from "./MomentsModuleBack";
import MomentsModulePhoto from "./MomentsModulePhoto";
import MomentsModuleGalery from "./MomentsModuleGalery";
import setupStyles from "../../stylesModules/setupStyles";




function CircleMomentsMenu( showSet) {
  const style = setupStyles("mainstyle")
  const auth = useSelector((state) => state.auth);
  const srcValue = "data:image/png;base64, " + auth.avatar

  const [show, setShow] = useState(showSet)

 
  return (
    <>

      <div className={style.items}>
        <div className={!show ? style.item : style.item + " " + style.open}>
          <div className={style.item_style}>
    <span className={style.span_menu} style={{
      left: "18%",
      top: "-42%"
    }}><MomentsModuleBack/></span>

<span className={style.span_menu} style={{
     left: "71%",
     top: "-23%"
    }}><MomentsModuleGalery/></span>

     <span className={style.span_menu} style={{
      left: "92%",
      top: "30%"
    }}><MomentsModulePhoto/></span>

          </div>
        </div>

        <div>
           
          <img className={style.open_menu} src={srcValue} onClick={function () {
            setShow(!show)
          }
          } />
        </div>
      </div>

    </>

  )
}

export default CircleMomentsMenu;



