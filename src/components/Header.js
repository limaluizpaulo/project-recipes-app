import React from 'react';
import profile from '../images/profileIcon.svg';
import search from '../images/searchIcon.svg';

function Header() {
  return (
    <div>
      <img src={ profile } alt="Profile Avatar" />
      <h2 data-testid="page-title">Page Title</h2>
      <img src={ search } alt="Search Icon" />
    </div>
  );
}

export default Header;
