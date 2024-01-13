import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage/Home";
import TeacherPage from "./pages/Teacher"
import Register from "./pages/RegisterPage/RegisterPage";
import SettingsPage from "./pages/Student/SettingsPageStudent"
import { loadUser } from "./components/auth/slices/authSlice";
import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import RequireAuth from "./components/auth/services/RequireAuth";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
   
    dispatch(loadUser(null));
  }, [dispatch]);
  return (
    <div className="App">
      <BrowserRouter>
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/app/teacher/:id" element={<TeacherPage/>}/>
            <Route path="/app/teacher/" element={<TeacherPage/>}/>
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