import setupStyles from "../stylesModules/setupStyles";

const Content =() => {

  const style = setupStyles("mainstyle")
   
   return (

<div className={style.tablemain}>
<form className={style.form_profile}>
<table className={style.tablemain}>
  <thead>
      <tr>
        <th>События</th>
      </tr>
  </thead>
  <tbody>
        <tr >
          <td>новость</td>
        </tr>
        <tr >
          <td>новость</td>
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

export default Content;


  