import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, database, ref, set } from '../firebase';

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create a new user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Additional user data to be stored in the database
      const user = userCredential.user;
      const userData = {
        id: user.uid,
        email: user.email,
        createdAt: Date.now(),
      };

      // Save the user data in the database under the "users" node with the user's UID as the key
      await set(ref(database, `users/${user.uid}`), userData);

      // Navigate to the login page after successful signup
      navigate('/login');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Signup</button>
      </form>
      <p>
        Already have an account? <NavLink to="/login">Login</NavLink>
      </p>
    </div>
  );
};

export default Signup;
