// components/layout/Navbar.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/auth/AuthContext';

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout, user } = authContext;

  const onLogout = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <h1>
        <Link to="/">
          <i className="fas fa-vote-yea"></i> VoteCloud
        </Link>
      </h1>
      <ul>
        {isAuthenticated ? (
          <>
            <li>Hello, {user && user.username}</li>
            <li>
              <Link to="/elections">Elections</Link>
            </li>
            {user && user.isAdmin && (
              <li>
                <Link to="/admin/dashboard">Admin Dashboard</Link>
              </li>
            )}
            <li>
              <a onClick={onLogout} href="#!">Logout</a>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/elections">Elections</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
