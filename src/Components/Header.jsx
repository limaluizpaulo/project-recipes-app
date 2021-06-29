import React from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../styles/Header.css';

export default function Header() {
  return (
    <header className="header-container">
      <Link to="/perfil">
        <img src={ profileIcon } alt="profile" data-testid="profile-top-btn" />
      </Link>
      <h1 data-testid="page-title">{ title }</h1>
      <button type="button" onClick={ showSearchBar }>
        <img src={ searchIcon } alt="search" data-testid="search-top-btn" />
      </button>
    </header>
  );
}
