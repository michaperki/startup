import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import Dashboard from "../components/Dashboard";

const HomePage = () => {
  const [currentUser, setCurrentUser] = useState(null);

  // Check if the user is already logged in when the app starts
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
    });

    return () => unsubscribe(); // Cleanup the listener when the component unmounts
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      <p>This is the home page</p>
      {currentUser ? (
        <Dashboard />
      ) : (
        <p>Please log in to view your dashboard.</p>
      )}
    </div>
  );
};

export default HomePage;
