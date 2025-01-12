import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-link">Products</Link>
      </div>
      <div className="navbar-center">
        <input type="text" className="search-bar" placeholder="Search..." />
      </div>
      <div className="navbar-right">
        <img src={'/images/userDefault.png'} alt="Profile" className="profile-pic" />
        <Link to="/profile" className="username">Arya</Link>
        <Link to="/login" className="navbar-link">Logout</Link>
      </div>
    </nav>
  );
}

export default Navbar;
