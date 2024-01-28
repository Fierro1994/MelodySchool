import { Link } from "react-router-dom";
import styles from "./menu.module.css"
const ProfileAddModules = ()=> {
    return (     
       <Link  className={styles.item_menu_a} to={"/app/settings/"}>Настройки</Link>
    );
  }
  export default ProfileAddModules;