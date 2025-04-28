import React, { useState } from "react";
import axios from "axios"; // Import Axios
import { useNavigate } from "react-router-dom";
import "./RegisterStudent.css";
import logo1 from "../Assets/logo1.jpg";

const RegisterStudent = () => {
  const navigate = useNavigate();

  // State for form inputs
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    nationality: "",
    phone: "",
    university: "",
    registrationNo: "",
    password: "",
    confirmPassword: "",
    resume: null,
    photo: null,
  });

  // Handle text input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file uploads
  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check password confirmation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const submissionData = new FormData();
    Object.keys(formData).forEach((key) => {
      submissionData.append(key, formData[key]);
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/auth/register-student",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 201) {
        alert("Registration Successful!");
        navigate("/login");
      } else {
        alert(response.data.error || "Registration Failed!");
      }
    } catch (error) {
      console.error("Error registering:", error.response?.data || error);
      alert("An error occurred!");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <div className="nav-buttons">
          <button onClick={() => navigate("/")} className="nav-button">Home</button>
          <button onClick={() => navigate("/login")} className="nav-button">Login</button>
        </div>

        <img src={logo1} alt="Logo1" className="logo1" />
        <h2 className="title">Register as a Student</h2>

        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <input type="text" name="firstName" placeholder="First Name" required onChange={handleChange} />
            <input type="text" name="lastName" placeholder="Last Name" required onChange={handleChange} />
          </div>
          <div className="form-row">
            <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
            <input type="text" name="nationality" placeholder="Nationality" required onChange={handleChange} />
          </div>
          <div className="form-row">
            <input type="tel" name="phone" placeholder="Phone No." required onChange={handleChange} />
            <input type="text" name="university" placeholder="University Name" required onChange={handleChange} />
          </div>
          <div className="form-row">
            <input type="text" name="registrationNo" placeholder="Registration No." required onChange={handleChange} />
          </div>

          <div className="form-row">
            <span className="file-text">Resume:</span>
            <input type="file" name="resume" accept=".pdf,.doc,.docx" className="full-width" onChange={handleFileChange} />
          </div>
          <div className="form-row">
            <span className="file-text">Photo:</span>
            <input type="file" name="photo" accept="image/*" className="full-width" onChange={handleFileChange} />
          </div>
          <div className="form-row">
            <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" required onChange={handleChange} />
          </div>

          <button type="submit" className="submit-button">Create Profile</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterStudent;
