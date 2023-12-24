import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import StudentPage from "./pages/Student";
import TeacherPage from "./pages/Teacher"
import Register from "./components/auth/Register";
import Login from "./components/auth/Login/Login";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/student/:id" element={<StudentPage/>}/>
            <Route path="/student/" element={<StudentPage/>}/>
            <Route path="/teacher/:id" element={<TeacherPage/>}/>
            <Route path="/teacher/" element={<TeacherPage/>}/>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;