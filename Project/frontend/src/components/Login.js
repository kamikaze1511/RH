import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo1 from "../Assets/logo1.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
     try {
      // Simulating an API call
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token); // Save token for authentication
        navigate("/profile"); // Redirect to the profile page
      } else {
        alert("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="login-container">
          <div className="login-box">
             {/* Logo */}
                <img src={logo1} alt="Logo1" className="logo1" />

        <h2 className="logo-text">
          <span className="blue">Researcher</span> <span className="blue">Hive</span>
        </h2>

        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />

          {/* Buttons Container */}
          <div className="button-container">
            <button type="submit" className="login-button1">Log In</button>
            <button type="button" className="home-button" onClick={() => navigate("/")}>Home</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
