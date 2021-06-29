import React from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

// data-testids `profile-top-btn`, `page-title` e `search-top-btn`

function Header({ title }) {
  return (
    <header>
      <div data-testid="profile-top-btn">
        <button type="button">
          <img src={ profileIcon } alt="Profile" />
        </button>
      </div>
      <div data-testid="page-title">{ title }</div>
      <div data-testid="search-top-btn">
        <button type="button">
          <img src={ searchIcon } alt="Search" />
        </button>
      </div>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Header;
