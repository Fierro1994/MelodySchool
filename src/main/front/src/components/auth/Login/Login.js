import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";
import style from "./login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

 

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/student/${auth.username}`);
    dispatch(loginUser(user));
  };

  return (
  <div className={style.form_signin}>
    <form onSubmit={handleSubmit} > 
      <div>
          <input
            type="name"
            placeholder="username"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
      </div>
    
      <div>
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          /> 
      </div>
      
      <button className={style.btn} >
          {auth.loginStatus === "pending" ? "Загрузка..." : "Войти"}
      </button>
        {auth.loginStatus === "rejected" ? <p>{auth.loginError}</p> : null}
    </form>
    </div>
  );
};

export default Login;