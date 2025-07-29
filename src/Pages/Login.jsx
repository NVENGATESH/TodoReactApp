import "./Login.css";
import logo from '../assets/logo.jpg'; 
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../Api/Api";

export default function Login({ fetchUser }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const res = await loginUser(form);
    console.log("Login res:", res);  // 👈 Add this
    await fetchUser();
    alert("Logged in!");
    navigate("/dashboard");
  } catch (err) {
    alert("Login failed: " + (err.response?.data?.message || "Invalid credentials"));
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <div className="LoginConatiner">
        <div className="loginbox">
          <div className="loginFirstContainer">
            <div className="logodiv"><img src={logo} alt="" /></div>
            <h2>Welcome Back</h2>
            <p>please enter your details to sign in</p> {/* fixed typo */}
            <div className="btns">
              <button><FaGoogle className="googlis" /></button>
              <button><FaGithub className="googlis" /></button>
              <button><FaFacebook className="googlis" /></button>
            </div>
            <p>or</p>
          </div>
          <form action="" onSubmit={handleSubmit}>
            <div className="INPUTS">
              <label htmlFor="username">Username</label>
              <input name="username" placeholder="Username" onChange={handleChange} required />
            </div>
            <div className="INPUTS">
              <label htmlFor="password">Password</label>
              <input name="password" placeholder="Password" type="password" onChange={handleChange} required />
            </div>
            <div className="remembermecontainer">
              <div className="rememberme">
                <input type="checkbox" id="checkbox" />
                <label htmlFor="checkbox">Remember me</label>
              </div>
              <p>Forgot Password</p>
            </div>
            <p className="lines"></p>
            <button type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
          <p>Don't have an account? <Link to="/register">Create</Link> account</p>
        </div>
      </div>
    </>
  );
}
