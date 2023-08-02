// ChallengeModal.js
import React, { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";
import { off } from "firebase/database";

const ChallengeModal = ({ onClose, onCreateChallenge, currentUser }) => {
  const [challengeName, setChallengeName] = useState("");
  const [challengeDuration, setChallengeDuration] = useState(7);
  const [users, setUsers] = useState([]); // New state variable to hold the list of users
  const [selectedOpponent, setSelectedOpponent] = useState(""); // Initialize with an empty string

  useEffect(() => {
    // Fetch the list of users from the database
    const usersRef = ref(database, "users");
    onValue(usersRef, (snapshot) => {
      const users = snapshot.val();
      const usersList = [];
      for (let id in users) {
        if (id === currentUser.uid) continue; // Don't include the current user in the list of users
        usersList.push(users[id]);
      }

      setUsers(usersList);
    });

    // Clean up the listener on unmount
    return () => {
      off(usersRef);
    };
  }, []);

  const handleCreateChallenge = () => {
    // Validate the input fields here if needed
    onCreateChallenge(challengeName, challengeDuration, selectedOpponent); // Pass selectedOpponent to handleCreateChallenge
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Create Challenge</h2>
        <input
          type="text"
          value={challengeName}
          onChange={(e) => setChallengeName(e.target.value)}
          placeholder="Challenge Name"
        />
        <label>Challenge Duration (in days):</label>
        <input
          type="number"
          value={challengeDuration}
          onChange={(e) => setChallengeDuration(e.target.value)}
        />

        <label>Select Opponent:</label>
        <select
          value={selectedOpponent}
          onChange={(e) => setSelectedOpponent(e.target.value)}
        >
          <option value="">-- Select an opponent --</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.email}
            </option>
          ))}
        </select>

        <button onClick={handleCreateChallenge}>Create</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default ChallengeModal;
