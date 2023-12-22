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
    (state) => state.user
  );

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    re_password: "",
    error: "",
  });

  const { name, email, password, re_password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password === re_password) {
      dispatch(register({ name, email, password }));

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

  if (registered) return <Navigate to="/login" />;

  return (
    <div className="container mt-5">
      <h1>Register for an Account</h1>
      <p>Create an account with our Session Auth application</p>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label className="form-label">Name: </label>
          <input
            className="form-control"
            type="text"
            placeholder="name*"
            name="name"
            onChange={(e) => onChange(e)}
            value={name}
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
          <label className="form-label mt-3">Password: </label>
          <input
            className="form-control"
            type="password"
            placeholder="Password*"
            name="password"
            onChange={(e) => onChange(e)}
            value={password}
            minLength="6"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label mt-3">Confirm Password: </label>
          <input
            className="form-control"
            type="password"
            placeholder="Confirm Password*"
            name="re_password"
            onChange={(e) => onChange(e)}
            value={re_password}
            minLength="6"
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