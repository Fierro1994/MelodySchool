import { useDispatch, useSelector } from "react-redux";
import Moments from "./moments/Moments";
import setupStyles from "../stylesModules/setupStyles";

const MyTable =() => {
const dispatch = useDispatch();
  const style = setupStyles("mainstyle")
   return (

<div className={style.tablemain}>

      <Moments/>
      
 </div>
   )
}

export default MyTable;


  