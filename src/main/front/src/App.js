import React from "react";
import HomePage from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Teacher from "./pages/Teacher";
import JournalTeacher from "./pages/JournalTeacher";
import { BrowserRouter, Routes, Route } from 'react-router-dom';



function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/teacher" element={<Teacher />} />
    <Route path="/journal_teacher" element={<JournalTeacher />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
