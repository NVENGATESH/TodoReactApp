import "./Register.css";
import logo from '../assets/logo.jpg'; 
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // <-- Import Link here
import { registerUser } from "../Api/Api";


export default function Register() {
    const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form);
      alert("✅ Registered successfully. Please log in.");
      navigate("/login");
    } catch (err) {
      alert("❌ Error: " + (err.response?.data?.message || "Registration failed"));
    }
  };
  return (
    <>
      <div className="RegiterConatiner">
        <div className="Registerbox">
          <div className="loginFirstContainer">
            <div className="logodiv"><img src={logo} alt="" /></div>
            <h2>Create an new Account</h2>
            <p>please enter your details to sighn Up</p>
            <div className="btns"><button><FaGoogle className="googlis" /></button><button><FaGithub className="googlis" /></button><button><FaFacebook  className="googlis"/></button></div>
            <p>or</p>
          </div>
          <form action="" onSubmit={handleSubmit}>
             <div className="INPUTS">
              <label htmlFor="username">Username</label>

              <input   name="username"
          placeholder="Username"
          onChange={handleChange}
          required />
            </div>
            <div className="INPUTS">
              <label htmlFor="email">Email adress</label>

              <input  name="email"
          placeholder="Email"
          onChange={handleChange}
          required/>
            </div>
            <div className="INPUTS">
              <label htmlFor="password">Password</label>

              <input  name="password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
          required/>
            </div>
            <div className="remembermecontainer">
              <div className="rememberme">
                <input type="checkbox" id="checkbox" />
                <label htmlFor="checkbox" >I agree to all of them <span>Term ,privacy policy</span> and <span>fees</span></label>
              </div>
            
            </div>
            <p className="lines"></p>
            <button type="submit">Sign Up</button>
          </form>
          <p>Already have an account?<Link to="/login">Login</Link></p>
        </div>
      </div>
    </>
  );
}
