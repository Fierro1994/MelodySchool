import { useDispatch, useSelector } from "react-redux";
import styles from "./students.module.css";
import { useState } from "react";
import { instanceWidthCred } from "../../components/auth/api/api";
import { getItemsMenu, updateSelectedMenu } from "../../components/auth/slices/authSlice";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import authService from "../../components/auth/services/authService";

export const CheckboxList = ({ data: dt }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const items = dt;
  const formData = new FormData();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      checkbox: [],
    }
  });

  
  const onSubmit = (data) => {
    data.checkbox.map(el => {
      formData.append("name", el)
      formData.append("userId", auth._id)
    })
    dispatch(updateSelectedMenu(formData))
    dispatch(getItemsMenu(auth._id))
    navigate("/")
  }

  return (
    <div>
      {auth.isEnabled?
        <form  onSubmit={handleSubmit(onSubmit)}>
          {items.map((item) =>
          (
            
            <div className={styles.checkbox_module} key={item.id}>
              <label> {item.nametwo} </label>
                <input {...register("checkbox")} className={styles.check} type="checkbox" value={item.name} defaultChecked={item.isEnabled} />
               
             
            </div>
          ))}
          <button className={styles.btn} type="submit">Сохранить</button>
        </form>
        : <><p>Подтвердите email, чтобы пользоваться всеми возможностями</p>
        <p>Если уже подтвердили, перейдите по ссылке ниже</p>
        <a href="/"></a></>}
    </div>
  )
}