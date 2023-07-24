import React, { useState } from "react";
import "./Navbar.css";

const Navbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <input
          type="text"
          placeholder="Search for songs, artists, albums..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}/>
          <button onClick={handleSearch}>Search</button>
      </div>
    </nav>
  );
};

export default Navbar;
