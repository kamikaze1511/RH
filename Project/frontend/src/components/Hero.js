import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Hero.css';

const Hero = () => {

   const [memberCount, setMemberCount] = useState(0); // ✅ Define state properly

  useEffect(() => {
    axios.get('http://localhost:5000/auth/get-user-count') // ✅ Correct API endpoint
      .then(response => {
        console.log("Member Count API Response:", response.data); // Debugging log
        setMemberCount(response.data.count);
      })
      .catch(error => console.error('Error fetching member count:', error));
  }, []);
  return (
    <div className="hero">
      <h1>Welcome to Researcher Hive</h1>
      <p>Connect, collaborate, and grow with researchers worldwide.</p>
       <p className="member-count">Registered Members: {memberCount}</p>
    </div>
  );
};

export default Hero;