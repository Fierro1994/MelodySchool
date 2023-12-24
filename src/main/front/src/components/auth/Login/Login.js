import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {login, logoutUserRed, loginUserRed } from "../../slices/authSlice";
import { Link, Navigate } from "react-router-dom";

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

 

  return (
    <div className="container mt-5">
      <h1>Sing In</h1>
      <p>Sing Into Your Session Auth Account</p>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label className="form-label">email: </label>
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
          <label className="form-label mt-3">Password: </label>
          <input
            className="form-control"
            type="password"
            placeholder="Password*"
            name="password"
            onChange={(e) => onChange(e)}
            value={password}
            required
          />
        </div>
        {/* error */}
        {formData.error && <p className="text-danger">{formData.error}</p>}{" "}
        {loading ? (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading ...</span>
          </div>
        ) : (
          <button className="btn btn-primary mt-3" type="submit">
            Login
          </button>
        )}
      </form>
      <p className="mt-3">
        Don't have an Account? <Link to="/register">Sign Up</Link>
      </p>
    </div>
  );
}
export default Login;