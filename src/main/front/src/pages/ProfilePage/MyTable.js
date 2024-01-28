import { useDispatch, useSelector } from "react-redux";
import styleprofile from "./profile.module.css";

const MyTable =() => {
const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  
  const onSubmit = (data) => {
     
    }

   
   return (

<div>
<form className={styleprofile.form_profile}>
<table className={styleprofile.tablemain}>
  <thead>
      <tr>
        <th>Мой профиль</th>
      </tr>
  </thead>
  <tbody>
        <tr >
          <td>Статус</td>
        </tr>
        <tr >
          <td>Статус</td>
        </tr>
        <tr >
          <td>Статус</td>
        </tr>
        <tr >
          <td>Статус</td>
        </tr>
  </tbody>
</table>

</form>
 </div>
   )
}

export default MyTable;


  