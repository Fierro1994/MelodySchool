import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export const RoleIdent = (state) => {
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);
    if (auth._id) {
        navigate("/app/student/"+auth.firstname + auth.lastname + auth._id);
      }
}
