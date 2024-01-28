import { useDispatch, useSelector } from "react-redux";
import styleprofile from "./moments.module.css";
import Moments from "./moments/Moments";

const MyTable =() => {
const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  
  const onSubmit = (data) => {
     
    }

   
   return (

<div className={styleprofile.tablemain}>

      <Moments/>
      
 </div>
   )
}

export default MyTable;


  