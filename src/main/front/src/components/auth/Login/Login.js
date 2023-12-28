import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {login, logoutUserRed, loginUserRed } from "../../slices/authSlice";
import style from "./login.module.css";
import { Link, Navigate } from "react-router-dom";
import validator from 'validator';

function Login() {
  const { loading,  registered, isError, message, isSuccess } =
    useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (registered) dispatch(logoutUserRed);
  }, [isError, isSuccess, message]);

  const { username, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    await dispatch(login({ username, password }));

    if (isError) {
      setFormData({
        ...formData,
        error: message,
      });
    }
  };

 const escapeAndTrim = (str) => {
 str
   .replace(/[<>&'"/]/g, '')
   .replace(/\s{2,}/g, ' ')
   .trim()
}


  return (
    <>
  <div className={style.form_signin}>
    <form onSubmit={(e) => onSubmit(e)}>
      <div>
        <input
          type="text"
          placeholder="Логин*"
          name="username"
          onChange={(e) => onChange(e)}
          value={username}
          required
        />
        </div>
        <div>
        <input
          type="password"
          placeholder="Пароль*"
          name="password"
          onChange={(e) => onChange(e)}
          value={password}
          required
        />
        </div>
      {/* error */}
      {formData.error && <p className="text-danger">Ошибка доступа</p>}{" "}
      {loading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">загрузка ...</span>
        </div>
      ) : (
        <button className={style.btn} type="submit">
          Войти
        </button>
      )}
    </form>
    <div className={style.textBottom}>
      Ещё нет аккаунта? <a href="/">зарегестрируйтесь</a>
    </div>
    
  </div>
  </>
  );
}
export default Login;