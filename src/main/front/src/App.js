import { BrowserRouter, Routes, Route, useNavigate, Link } from "react-router-dom";
import Home from "./pages/HomePage/Home";
import Register from "./pages/RegisterPage/RegisterPage";
import SettingsPageInterface from "./pages/SettingsPage/SettingsPageInterface"
import { getLastTimeOnline, loadUser } from "./components/auth/slices/authSlice";
import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import RequireAuth from "./components/auth/services/RequireAuth";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import authService from "./components/auth/services/authService";
import MomentsPage from "./pages/MomentsPage/MomentsPage";
import MomentsAddPage from "./pages/MomentsPage/MomentsAddPage";
import verifyToken from "./components/auth/services/verifyToken";
import SettingsPageMainPage from "./pages/SettingsPage/settingsPageMainPage/SettingsPageMainPage";
import Imagepromotest from "./components/auth/services/Imagepromotest";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(loadUser(null));
    if (auth._id){
      authService.SetOnlineTime(auth._id)
      dispatch(getLastTimeOnline(auth._id))
    }
  }, [dispatch]);
  return (
    <div className="App">
      <BrowserRouter>
        <div className="content-container">
          <Routes>
           <Route path="/app/profile" element={<RequireAuth><ProfilePage /></RequireAuth>}/> 
             <Route path="/" element={<RequireAuth><Home /></RequireAuth>}/>
            <Route path="/app/moments/" element={<RequireAuth><MomentsPage /></RequireAuth>}/>
            <Route path="/app/moments/add/" element={<RequireAuth><MomentsAddPage /></RequireAuth>}/>
            <Route path="/app/register" element={<Register />} />
            <Route path="/app/settings/interface" element={<RequireAuth><SettingsPageInterface /></RequireAuth>} />
            <Route path="/app/settings/mainpage" element={<RequireAuth><SettingsPageMainPage /></RequireAuth>} />
            <Route path="/api/auth/confirm?token/:id" element={<RequireAuth><Home /></RequireAuth>} /> 
            <Route path="/app/imagepromo" element={<RequireAuth><Imagepromotest/></RequireAuth>} /> 
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;