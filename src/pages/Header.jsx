import React from 'react';
import profileIcon from '../images/profileIcon.svg';

function Header() {
  return (
    <header>
      <img src={ profileIcon } alt="profile icon" data-testid="profile-top-btn" />
      <h3 data-testid="page-title">título provisório</h3>
    </header>
  );
}

export default Header;
