import { useDispatch, useSelector } from "react-redux";
import style from "../auth/Login/login.module.css"
import styleprofile from "./styleprofile.module.css";

const MyTable =() => {
const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  
  const onSubmit = (data) => {
     
    }

   
   return (

<div>
<form className={style.form_signin}>
<table className={styleprofile.tablemain}>
  <thead>
      <tr>
        <th> Имя</th>
        <th> Фамилия</th>
        <th> Специальность</th>
      </tr>
  </thead>
  <tbody>
        <tr >
        <td>{auth.firstName}</td>
        <td>{auth.lastName}</td>
        <td>{auth.roles}</td>
        </tr>
  </tbody>
</table>
<table className={styleprofile.tablemain}>
  <thead>
      <tr>
        <th> Возраст</th>
      </tr>
  </thead>
  <tbody>
        <tr >
        <td><input type="text" ></input></td>
        </tr>
  </tbody>
</table>
<table className={styleprofile.tablemain}>
  <thead>
      <tr>
        <th>Увлечения</th>
      </tr>
  </thead>
  <tbody>
        <tr >
         <td><input type="text" ></input></td>
        </tr>
  </tbody>
</table>
<table className={styleprofile.tablemain}>
  <thead>
      <tr>
        <th> Навыки</th>
      </tr>
  </thead>
  <tbody>
        <tr >
        <td><input type="text" ></input></td>
        </tr>
  </tbody>
</table>
<table className={styleprofile.tablemain}>
  <thead>
      <tr>
        <th> Любимая музыка</th>
      </tr>
  </thead>
  <tbody>
        <tr >
        <td><input type="text" ></input></td>
        </tr>
  </tbody>
</table>
<table className={styleprofile.tablemain}>
  <thead>
      <tr>
        <th>Любимые фильмы</th>
      </tr>
  </thead>
  <tbody>
        <tr >
         <td><input type="text" ></input></td>
        </tr>
  </tbody>
</table>
<table className={styleprofile.tablemain}>
  <thead>
      <tr>
        <th> Любимые книги</th>
      </tr>
  </thead>
  <tbody>
        <tr >
        <td><input type="text" ></input></td>
        </tr>
  </tbody>
</table>
<table className={styleprofile.tablemain}>
  <thead>
      <tr>
        <th>О себе </th>
      </tr>
  </thead>
  <tbody>
        <tr >
        <td><input type="textarea" ></input></td>
        </tr>
  </tbody>
</table>
</form>
 </div>
   )
}

export default MyTable;


  