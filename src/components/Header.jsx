import React from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header({ history, title }) {
  const isHeaderPresent = () => {
    const { location: { pathname } } = history;
    if (pathname === '/comidas'
      || pathname === '/bebidas'
      || pathname === '/explorar/comidas/area') {
      return (
        <img
          src={ searchIcon }
          alt="search icon"
          data-testid="search-top-btn"
        />
      );
    }
    return '';
  };
  return (
    <div>
      <div>
        <img
          src={ profileIcon }
          alt="profile icon"
          data-testid="profile-top-btn"
        />
      </div>
      <h1 data-testid="page-title">{ title }</h1>
      <div>
        { isHeaderPresent() }
      </div>
    </div>
  );
}

Header.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }),
  }).isRequired,
  title: PropTypes.string.isRequired,
};
