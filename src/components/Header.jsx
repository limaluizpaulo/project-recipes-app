import React from 'react';
import PropTypes from 'prop-types';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';

export default function Header({ title, search = false }) {
  return (
    <header>
      <img src={ searchIcon } alt="search icon" data-testid="profile-top-btn" />
      <span data-testid="page-title">{title}</span>
      {search
      && <img src={ profileIcon } alt="profile icon" data-testid="search-top-btn" />}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  search: PropTypes.bool.isRequired,
};
