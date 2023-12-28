import axios from "axios";
import { logoutUserRed } from "../slices/authSlice";
import { compose } from "@reduxjs/toolkit";

const REGISTER_URL = "/api/auth/register";
const LOGIN_URL = "/api/auth/signin";

export const instance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (originalConfig.url !== "/**" && err.response) {
    
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const rs = await instance.post("api/auth/refresh", {withCredentials:true,
          });

          const { accessToken } = rs.data.body.accessToken;
          localStorage.setItem("access", accessToken)
          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);
const register = async (userData) => {
  const response = await instance.post(REGISTER_URL, userData);
  return response.data;
};

const login = async (userData) => {

  const response = await instance.post(LOGIN_URL, userData,{
    withCredentials:true,
  });
  
 
  if (response.data) {
    console.log(response.data);
    localStorage.setItem("access", response.data.body.accessToken, {
    });
  }
  
  return response.data;
};

const rolesUser = async () => {

  const response = await instance.get("/app/student/**",{
    
  });
  
 
  if (response.data) {
    console.log(response.data);
    localStorage.setItem("access", response.data.body.accessToken, {
    });
  }
  
  return response.data;
};


const refresh = async () => {

  const response = await instance.post("/api/auth/refresh",{
    withCredentials:true,
  });
  console.log(response);
  localStorage.setItem("access",response.data.body.accessToken )
  return response.data;
};

const logout = async () => {
    instance.get("/api/auth/logout")
    localStorage.setItem("access", "", {
  });
};



const authService = { refresh,register, login, logout};

export default authService;
