import { useDispatch, useSelector } from "react-redux";
import { Link,useLocation } from "react-router-dom";
import verifyToken from "./verifyToken";
import { setOnlineTime } from "../slices/authSlice";
import authService from "./authService";


function RequireAuth({ children }) {

  const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    if (auth._id){
        verifyToken(auth.token)
        
      }

      
    
    let location = useLocation();
    if (!auth._id) {
      

      return <Link to="/" />;
    }
  
    return children;
  }
  export default RequireAuth;