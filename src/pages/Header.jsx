import React, { Link } from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from '../components/SearchBar';

const Header = () => (
  <div>
    <Link to="/perfil">
      <img src={ profileIcon } alt="profileIcon" data-testid="profile-top-btn" />
      ;
    </Link>
    <h1 data-testid="profile-title">Comidas</h1>
    <img src={ searchIcon } alt="profileIcon" data-testid="search-top-btn" />
    ;
    <SearchBar />
  </div>

);
export default Header;
