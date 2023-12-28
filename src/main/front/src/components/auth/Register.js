import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import { register } from "../slices/authSlice";

const Register = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { registered, loading, isError, message } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName:"",
    lastName: "",
    username: "",
    email: "",
    password: "",
    re_password: "",
    roles: [],
    error: "",
  });

  const { firstName, lastName, username, email, password, re_password, roles} = formData;


  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "roles"){
      setFormData({ ...formData, [e.target.name]: [e.target.value ]});
    }
   
    console.log(formData);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password === re_password) {
      dispatch(register({ firstName, lastName,username, email, password, roles }));
      if (isError) {
        setFormData({
          ...formData,
          error: message,
        });
      }
    } else {
      setFormData({
        ...formData,
        error: "Please enter a password matching re_password",
      });
    }
  };
 
  if (registered) return <Navigate to="/" />;

  return (
    <div className="container mt-5">
      <h1>Регистрация аккаунта</h1>
      <form onSubmit={(e) => onSubmit(e)}>
      <div className="form-group">
          <label className="form-label">Имя: </label>
          <input
            className="form-control"
            type="text"
            placeholder="firstName*"
            name="firstName"
            onChange={(e) => onChange(e)}
            value={firstName}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Фамилия: </label>
          <input
            className="form-control"
            type="text"
            placeholder="lastName*"
            name="lastName"
            onChange={(e) => onChange(e)}
            value={lastName}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Логин: </label>
          <input
            className="form-control"
            type="text"
            placeholder="username*"
            name="username"
            onChange={(e) => onChange(e)}
            value={username}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label mt-3">email </label>
          <input
            className="form-control"
            type="email"
            placeholder="Email*"
            name="email"
            onChange={(e) => onChange(e)}
            value={email}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label mt-3">Пароль: </label>
          <input
            className="form-control"
            type="password"
            placeholder="Password*"
            name="password"
            onChange={(e) => onChange(e)}
            value={password}
            minLength="1"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label mt-3">Повторите пароль: </label>
          <input
            className="form-control"
            type="password"
            placeholder="Confirm Password*"
            name="re_password"
            onChange={(e) => onChange(e)}
            value={re_password}
            minLength="1"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label mt-3">Роль: </label>
          <input
            className="form-control"
            type="text"
            placeholder="roles"
            name="roles"
            onChange={e => onChange(e)} 
            value={roles}
            minLength="1"
            required
          />
        </div>
        {/* Muestra el mensaje de error */}
        {formData.error && <p className="text-danger">{formData.error}</p>}{" "}
        {loading ? (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading ...</span>
          </div>
        ) : (
          <button className="btn btn-primary mt-3" type="submit">
            Register
          </button>
        )}
      </form>
      <p className="mt-3">
        Already have an Account? <Link to="/login">Sign In</Link>
      </p>
    </div>
  );
};

export default Register;