import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header({ history, title }) {
  const [searchInput, toggleSearch] = useState();
  const isHeaderPresent = () => {
    const { location: { pathname } } = history;
    if (pathname === '/comidas'
      || pathname === '/bebidas'
      || pathname === '/explorar/comidas/area') {
      return (
        <button type="button" onClick={ () => toggleSearch(!searchInput) }>
          <img
            src={ searchIcon }
            alt="search icon"
            data-testid="search-top-btn"
          />
        </button>
      );
    }
    return '';
  };
  return (
    <div>
      <div>
        <Link to="/perfil">
          <img
            src={ profileIcon }
            alt="profile icon"
            data-testid="profile-top-btn"
          />
        </Link>
      </div>
      <h1 data-testid="page-title">{ title }</h1>
      <div>
        { isHeaderPresent() }
        { searchInput && (
          (
            <label htmlFor="search">
              Explorar:
              <input id="search" type="text" data-testid="search-input" />
            </label>
          )
        )}
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
