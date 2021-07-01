import React from 'react';
import HeaderSearchBar from './HeaderSearchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  return (
    <header>
      <img src={ profileIcon } alt="profile icon" data-testid="profile-top-btn" />
      <h3 data-testid="page-title">título provisório</h3>
      <img src={ searchIcon } alt="search icon" data-testid="search-top-btn" />
      <HeaderSearchBar />
    </header>
  );
}

export default Header;
