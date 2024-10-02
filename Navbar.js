import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ loggedInUser }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">CompanyApp</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        {!loggedInUser ? (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Signup</Link>
            </li>
          </>
        ) : (
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;