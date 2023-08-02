import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import FlossWarsPage from './pages/FlossWarsPage';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* Add the route for FlossWarsPage by challenge ID */}
          <Route path="/floss-wars/:challengeId" element={<FlossWarsPage />} /> 

          {/* If none of the above matches, redirect to home */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
