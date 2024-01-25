import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage/Home";
import Register from "./pages/RegisterPage/RegisterPage";
import SettingsPage from "./pages/UserPage/SettingsPage"
import { getLastTimeOnline, loadUser, setOnlineTime } from "./components/auth/slices/authSlice";
import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import RequireAuth from "./components/auth/services/RequireAuth";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import verifyToken from "./components/auth/services/verifyToken";
import authService from "./components/auth/services/authService";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    verifyToken(auth.token);
    dispatch(loadUser(null));
    authService.setOnlineTime(auth._id)
    dispatch(getLastTimeOnline(auth._id))
  }, [dispatch]);
  return (
    <div className="App">
      <BrowserRouter>
        <div className="content-container">
          <Routes>
            {auth._id && 
            <Route path="/" element={<RequireAuth><ProfilePage /></RequireAuth>}/> }
            <Route path="/" element={<Home />}/>
            <Route path="/app/register" element={<Register />} />
            <Route path="/app/settings" element={<RequireAuth><SettingsPage /></RequireAuth>} />
            <Route path="/api/auth/confirm?token/:id" element={<RequireAuth><Home /></RequireAuth>} />
            
            
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;