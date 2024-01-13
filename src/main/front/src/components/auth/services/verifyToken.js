import { jwtDecode } from "jwt-decode";
import authService from "./authService";;

const verifyToken = (token) => {
    if (token) {
        try {
                const decodedJwt = jwtDecode(token);
                if (decodedJwt.exp * 1000 < Date.now()) {
                        authService.refresh();
                }    
        } catch (error) {
               
                console.log(error);
        }
    }

}

export default verifyToken;