import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

const Header = ({ name, search }) => (
  <div>
    <Link to="/perfil">
      <img src={ profileIcon } alt="profileIcon" data-testid="profile-top-btn" />
    </Link>
    <h1 data-testid="page-title">{ name }</h1>

    { search && (
      <Link to="/explorar">
        <img src={ searchIcon } alt="profileIcon" data-testid="search-top-btn" />
      </Link>
    )}

    <SearchBar />
  </div>
);

Header.propTypes = {
  name: PropTypes.string,
  search: PropTypes.bool,
}.isRequired;

export default Header;
