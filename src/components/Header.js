import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './style/Header.css';

import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';

import SearchBar from './SearchBar';

function Header() {
  const [searchBar, setSearchBar] = useState(false);

  return (
    <header>
      <section className="header">
        <Link to="/perfil">
          <img data-testid="profile-top-btn" src={ ProfileIcon } alt="profile-icon" />
        </Link>
        <p>oi</p>
        <label htmlFor="search-icon">
          <input
            type="radio"
            onClick={ () => setSearchBar(!searchBar) }
            id="search-icon"
            className="search-icon-radio"
          />
          <img
            src={ SearchIcon }
            alt="search-icon"
            data-testid="search-top-btn"
            className="search-icon"
          />
        </label>
      </section>
      {searchBar && <SearchBar />}
    </header>
  );
}

export default Header;
