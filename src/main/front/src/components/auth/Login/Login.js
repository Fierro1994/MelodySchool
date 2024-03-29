import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItemsMenu, loginUser } from "../slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import style from "./login.module.css";
import stylecheck from "../../style_modules/checkbox.module.css";
import { useForm } from "react-hook-form";


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
 
  const {
    handleSubmit,
    formState: { errors, isValid },
    register,
    watch,

  } = useForm({
    mode: "onBlur"
  });
  
  const onSubmit = (data) => {
      dispatch(loginUser(data))
    }

  return (

    <form className={style.form_signin} onSubmit={handleSubmit(onSubmit)}>
      <div className={style.form_container}>
      <div>
        <input
          name="email"
          type='text'
          placeholder="email"
          {...register("email", {
            required: "Email обязателен!!!",
            pattern: {
              value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

              message: "Неправильный формат email",

            }
          })}
        ></input>
      </div>
      {errors && (<div className={style.errorcontainer}>
          {(errors?.email) && (
            <p className={style.error}>{errors.email.message}</p>
          )}</div>)}
      <div>
        <input
          name='password'
          id="password"
          type='password'
          placeholder="пароль"
          autoComplete='off'
          {...register("password", {
            // required: "Вы должны указать пароль",
            // pattern: {
            //   value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{6,}/,
            //   message: "Пароль должен содержать хотя бы одну цифру и один специальный символ.",
            // },
            // minLength: {
            //   value: 6,
            //   message: "Пароль должен быть более 6 символов"
            // },
            maxLength: {
              value: 20,
              message: "Пароль должен быть менее 20 символов"
            },
          })}
        ></input>
      </div>
      {errors && (<div className={style.errorcontainer}>
          {(errors?.password) && (
            <p className={style.error}>{errors.password.message}</p>
          )}</div>)}
      <div>
        <input
          id="confirmPassword"
          name="confirmPassword"
          placeholder="повторите пароль"
          type='password'
          {...register('confirmPassword', {
            validate: value =>
              value === watch("password", "") || "Пароли не совпадают"
          })}
          autoComplete='off'
          onPaste={(e) => {
            e.preventDefault();
            return false
          }}
        />
      </div>

      <div className={stylecheck.checkbox_container}>
              <label> Запомнить меня</label>
                <input {...register("checkbox")} className={stylecheck.check} type="checkbox" />
            </div>
    
      {errors && (<div className={style.errorcontainer} >
          {(errors?.rememberme) && (
            <p className={style.error}>{errors.rememberme.message}</p>
          )}</div>)}
      <div>
        <div>
          <button className={style.btn} >Войти</button>
          
        </div>
      
        <div>  {auth? <p className={style.error}>{}</p> : <></>}</div>
      
      </div>
        <Link  className={style.btn_link} to={"/app/register/"}>Регистрация</Link>
      </div>
     
    </form>

  );
};

export default Login;



