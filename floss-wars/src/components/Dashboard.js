// Dashboard.js
import React, { useState, useEffect } from "react";
import app, { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [opponent, setOpponent] = useState(null);
  const [currentUserStreak, setCurrentUserStreak] = useState(0);
  const [opponentStreak, setOpponentStreak] = useState(0);

  useEffect(() => {
    // Get the current user
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    // Clean up the listener on unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (currentUser) {
      // TODO: Fetch the current user's streak from the database and update setCurrentUserStreak()
    }
    // TODO: Fetch the opponent's streak from the database and update setOpponentStreak()
  }, [currentUser]);

  const handleFloss = () => {
    // TODO: Record the user's flossing activity for the current day in the database
    // TODO: Update the currentUserStreak state and check if the user surpassed the opponent's streak
  };

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <div>
      <h2>Welcome, {currentUser ? currentUser.email : "Guest"}</h2>
      <p>Your streak: {currentUserStreak} days</p>
      {opponent && (
        <p>
          {opponent.email}'s streak: {opponentStreak} days
        </p>
      )}
      <button onClick={handleFloss}>Record Flossing Activity</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
