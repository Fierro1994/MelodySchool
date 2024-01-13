import { useSelector } from "react-redux";
import { instance, instanceWidthCred } from "../api/api";



const refresh = async () => {


  const response = await instanceWidthCred.post("/api/auth/refresh",{
  });
  if (response.status.valueOf(404))
   {
    localStorage.removeItem("access");
    localStorage.removeItem("menuModules")
  
  }
  if(response.data.body.accessToken){localStorage.setItem("access",response.data.body.accessToken)}
   
  return response.data;
};


const logout = async (_id) => {
  try {
    const response = await instance.post(`/api/auth/logout`, {
      userId: _id
    });
   return response;
  } catch (error) {
    console.log(error);
  }
 
} 

const authService = { refresh , logout};

export default authService;
