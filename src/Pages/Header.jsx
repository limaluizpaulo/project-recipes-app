import React, { Link } from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

const Header = () => (
  <div>
    <Link to="/perfil">
      <img src={ profileIcon } alt="profileIcon" />
      ;
    </Link>
    <h1 data-testid="profile-title">Comidas</h1>
    <img src={ searchIcon } alt="profileIcon" />
    ;
  </div>
);
export default Header;
