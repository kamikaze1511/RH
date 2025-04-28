import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");  
      if (!token) {
        setError("No token found. Please log in.");
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data);
      } catch (err) {
        setError("Failed to fetch profile.");
        console.error("Error fetching profile:", err.response?.data || err);
      }
    };

    fetchProfile();
  }, []);

  //  Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token");  // Remove Token
    navigate("/");  // Redirect to Home Page
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="profile-page">
      {/*  Navbar for Profile Page */}
      <nav className="profile-navbar">
        <div className="profile-info">
          <img src={`http://localhost:5000/${user.photo}`} alt="Profile" className="profile-pic" />
          <span className="profile-name">{user.firstName} {user.lastName}</span>
        </div>
        <div className="nav-buttons">
          <button onClick={() => navigate("/")} className="nav-btn"> Home</button>
          <button onClick={handleLogout} className="nav-btn logout-btn"> Logout</button>
        </div>
      </nav>

      {/*  Profile Details */}
      <div className="profile-content">
        <h2>Welcome, {user.firstName} {user.lastName}</h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>University:</strong> {user.university}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
      </div>
    </div>
  );
};

export default Profile;
