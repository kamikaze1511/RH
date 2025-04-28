import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for API calls
import "./RegisterResearcher.css";
import logo1 from "../Assets/logo1.jpg";

const RegisterResearcher = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    nationality: "",
    phone: "",
    researcherId: "",
    linkedIn: "",
    scopusId: "",
    orcid: "",
    universityName: "",
    registrationNo: "",
    password: "",
    confirmPassword: "",
    resume: null,
    photo: null,
  });

  const [otpData, setOtpData] = useState({
  emailOTP: "",
  phoneOTP: "",
  emailVerified: false,
  phoneVerified: false,
  });
  
  const sendEmailOTP = async () => {
  try {
    await axios.post("http://localhost:5000/auth/send-email-otp", {
      email: formData.email,
    });
    alert("OTP sent to email");
  } catch (error) {
    alert("Failed to send OTP");
  }
};

const sendPhoneOTP = async () => {
  try {
    await axios.post("http://localhost:5000/auth/send-phone-otp", {
      phone: formData.phone,
    });
    alert("OTP sent to phone");
  } catch (error) {
    alert("Failed to send OTP");
  }
};
 
  const verifyEmailOTP = async () => {
  try {
    await axios.post("http://localhost:5000/auth/verify-otp", {
      identifier: formData.email,
      otp: otpData.emailOTP,
    });
    alert("Email verified!");
    setOtpData({ ...otpData, emailVerified: true });
  } catch (error) {
    alert("Invalid OTP for email");
  }
};

const verifyPhoneOTP = async () => {
  try {
    await axios.post("http://localhost:5000/auth/verify-otp", {
      identifier: formData.phone,
      otp: otpData.phoneOTP,
    });
    alert("Phone verified!");
    setOtpData({ ...otpData, phoneVerified: true });
  } catch (error) {
    alert("Invalid OTP for phone");
  }
};



  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file inputs separately
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  // Submit form data
  const handleSubmit = async (e) => {
  e.preventDefault();

  // Check if OTPs are verified
  if (!otpData.emailVerified || !otpData.phoneVerified) {
    alert("Please verify both email and phone before submitting!");
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  const submitData = new FormData();
  for (const key in formData) {
    submitData.append(key, formData[key]);
  }

  try {
    const response = await axios.post(
      "http://localhost:5000/auth/register-researcher",
      submitData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    if (response.status === 201) {
      alert("Registration successful!");
      navigate("/login");
    } else {
      alert("Registration failed. Please try again.");
    }
  } catch (error) {
    console.error("Registration Error:", error.response?.data || error);
    alert("An error occurred during registration.");
  }
};


  return (
    <div className="register-container">
      <div className="register-box">
        {/* Home & Login Buttons */}
        <div className="nav-buttons">
          <button onClick={() => navigate("/")} className="nav-button">
            Home
          </button>
          <button onClick={() => navigate("/login")} className="nav-button">
            Login
          </button>
        </div>

        {/* Logo */}
        <img src={logo1} alt="Logo1" className="logo1" />
        <h2 className="title">Register as a Researcher</h2>

        {/* Registration Form */}
        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <input type="text" name="firstName" placeholder="First Name" required onChange={handleChange} />
            <input type="text" name="lastName" placeholder="Last Name" required onChange={handleChange} />
          </div>
          <div className="form-row">
            <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
            <button type="button" onClick={sendEmailOTP}>Send OTP</button>
            <input type="text" name="nationality" placeholder="Nationality" required onChange={handleChange} />
          </div>

          {!otpData.emailVerified && (
  <div className="form-row">
    <input type="text" name="emailOTP" placeholder="Enter Email OTP" onChange={(e) => setOtpData({ ...otpData, emailOTP: e.target.value })} />
    <button type="button" onClick={verifyEmailOTP}>Verify OTP</button>
  </div>
)}

          <div className="form-row">
            <input type="tel" name="phone" placeholder="Phone No." required onChange={handleChange} />
            <button type="button" onClick={sendPhoneOTP}>Send OTP</button>
            <input type="text" name="researcherId" placeholder="Researcher ID" onChange={handleChange} />
          </div>
          {!otpData.phoneVerified && (
  <div className="form-row">
    <input type="text" name="phoneOTP" placeholder="Enter Phone OTP" onChange={(e) => setOtpData({ ...otpData, phoneOTP: e.target.value })} />
    <button type="button" onClick={verifyPhoneOTP}>Verify OTP</button>
  </div>
)}
          <div className="form-row">
            <input type="url" name="linkedIn" placeholder="LinkedIn" onChange={handleChange} />
            <input type="text" name="scopusId" placeholder="Scopus ID" onChange={handleChange} />
          </div>
          <div className="form-row">
            <input type="text" name="orcid" placeholder="ORCID" onChange={handleChange} />
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

          <button type="submit" className="submit-button">
            Create Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterResearcher;
