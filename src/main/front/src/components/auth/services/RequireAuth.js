import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import verifyToken from "./verifyToken";


function RequireAuth({ children }) {
    const auth = useSelector((state) => state.auth);
    if (auth._id){
        verifyToken(auth.token)
      }
    
    let location = useLocation();
    if (!auth._id) {
      

      return <Navigate to="/" state={{ from: location }} replace />;
    }
  
    return children;
  }
  export default RequireAuth;