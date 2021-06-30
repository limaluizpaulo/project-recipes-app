import React from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

// data-testids `profile-top-btn`, `page-title` e `search-top-btn`

function Header({ title, show = true }) {
  return (
    <header>
      <div>
        <button type="button">
          <img data-testid="profile-top-btn" src={ profileIcon } alt="Profile" />
        </button>
      </div>
      <div data-testid="page-title">{title}</div>
      <div>
        {show && (
          <button type="button">
            <img data-testid="search-top-btn" src={ searchIcon } alt="Search" />
          </button>
        )}
      </div>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Header;
