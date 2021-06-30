import React from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  return (
    <header>
      <Link to="/perfil" data-testid="profile-top-btn">
        <img src={ profileIcon } alt="profile" />
      </Link>
      <h1 data-testid="page-title">comidas</h1>
      <button type="button" data-testid="search-top-btn">
        <img src={ searchIcon } alt="search button" />
      </button>
    </header>
  );
}

export default Header;
