import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/HomePage/Home";
import StudentPage from "./pages/Student/Student";
import TeacherPage from "./pages/Teacher"
import Register from "./components/auth/RegisterPage/Register";
import Login from "./components/auth/Login/Login";
import { loadUser } from "./components/auth/slices/authSlice";
import { useEffect } from "react";
import { useDispatch} from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    
    dispatch(loadUser(null));
  }, [dispatch]);
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/app/student/:id" element={<StudentPage/>}/>
            <Route path="/app/teacher/:id" element={<TeacherPage/>}/>
            <Route path="/app/teacher/" element={<TeacherPage/>}/>
            <Route path="/app/register" element={<Register />} />
            <Route path="/app/login" element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;