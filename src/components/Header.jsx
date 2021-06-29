import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';

export default function Header({ title, search = false }) {
  return (
    <header>
      <Link to="/perfil">
        <img src={ profileIcon } alt="profile icon" data-testid="profile-top-btn" />
      </Link>
      <span data-testid="page-title">{title}</span>
      {search
      && <img src={ searchIcon } alt="search icon" data-testid="search-top-btn" />}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  search: PropTypes.bool.isRequired,
};
