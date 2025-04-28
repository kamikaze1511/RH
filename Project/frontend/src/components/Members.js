import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Members.css';

const Members = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/users/get-users')
      .then(response => {
        console.log("API Response:", response.data); // ✅ Log the API response
        setMembers(response.data);
      })
      .catch(error => console.error('Error fetching members:', error));
  }, []);

  return (
    <section className="members">
      <h2>Recently Registered Members</h2>
      <div className="member-list">
        {members.length === 0 ? (
          <p>No members found.</p>  // ✅ Display message if empty
        ) : (
          members.map((member) => (
            <div key={member.id} className="member-card">
              {member.photo && <img src={`http://localhost:5000${member.photo}`} alt={member.name} className="member-photo" />
}
              <h3>{member.name}</h3>
              <p>{member.details}</p>
              <span className={`badge ${member.type.toLowerCase()}`}>{member.type}</span>
            </div>
          ))
        )}
      </div>
      <button className="see-more-button">See More</button>
    </section>
  );
};

export default Members;
