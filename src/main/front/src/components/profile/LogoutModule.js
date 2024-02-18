import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import setupStyles from "../../pages/stylesModules/setupStyles";
import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logoutUser } from "../auth/slices/authSlice";
const LogoutModule = ()=> {
   const style = setupStyles("mainstyle")
    return (     
       <div  className={style.item_menu_a}> <a className={style.logbtn} >Выход</a> </div>
    );
  }
  export default LogoutModule;