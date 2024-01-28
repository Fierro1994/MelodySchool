import { Link } from "react-router-dom";
import styles from "./menu.module.css"
import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logoutUser } from "../auth/slices/authSlice";
const LogoutModule = ()=> {
   
    return (     
       <div  className={styles.item_menu_a}> <a className={styles.logbtn} >Выход</a> </div>
    );
  }
  export default LogoutModule;