import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RegisterPage from "./Pages/Register";
import LoginPage from "./Pages/Login";
import DashboardPage from "./Pages/Dasboard";
import About from "./Pages/About";
import NavBarFunc from './Components/NavBarFunc';
import Create from './Pages/UpdateTodopage';
import { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(true); 

  const fetchCurrentUser = async () => {
    try {
      const res = await axios.get("https://nishanthtodoapp.onrender.com/api/auth/currentuser", {
        withCredentials: true,
      });
      setUserName(res.data.username);
      setUserEmail(res.data.email);
    } catch (err) {
      console.error(" Fetch user failed:", err);
      setUserName("");
      setUserEmail("");
    } finally {
      setLoading(false); 
    }
  };
  const clearUser = () => {
    setUserName("");
    setUserEmail("");
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const isLoggedIn = !!userName;

  if (loading) return <div style={{ padding: "2rem", fontSize: "1.5rem" }}>Loading...</div>;

  return (
    <BrowserRouter>
      <NavBarFunc
        userName={userName}
        userEmail={userEmail}
        fetchUser={fetchCurrentUser}
        clearUser={clearUser}
      />

      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage fetchUser={fetchCurrentUser} />} />
        <Route path="/dashboard" element={isLoggedIn ? <DashboardPage /> : <Navigate to="/login" />} />
        <Route path="/About" element={isLoggedIn ? <About /> : <Navigate to="/login" />} />
        <Route path="/create" element={isLoggedIn ? <Create /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
