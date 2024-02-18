import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import setupStyles from "../../pages/stylesModules/setupStyles";
const ProfileAddModules = ()=> {
   const style = setupStyles("mainstyle")
    return (     
       <Link  className={style.item_menu_a} to={"/app/settings/interface"}>Настройки</Link>
    );
  }
  export default ProfileAddModules;