import React from 'react';
import PropTypes from 'prop-types';
import iconProfile from '../images/profileIcon.svg';
import iconSearch from '../images/searchIcon.svg';

const Header = ({ search, title }) => (
  <div>
    <h1 data-testid="page-title">{title}</h1>
    <img src={ iconProfile } alt="profile" type="button" data-testid="profile-top-btn" />
    { search && <img
      src={ iconSearch }
      alt="search"
      type="button"
      data-testid="search-top-btn"
    /> }
  </div>
);

Header.defaultProps = {
  search: false,
  title: '',
};

Header.propTypes = {
  search: PropTypes.bool,
  title: PropTypes.string,
};

export default Header;
