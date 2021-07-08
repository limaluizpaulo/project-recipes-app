import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import Search from './Search';
import '../styles/header.css';

export default function Header({ history, title }) {
  const [searchInput, toggleSearch] = useState();
  const isHeaderPresent = () => {
    const { location: { pathname } } = history;
    if (pathname === '/comidas'
      || pathname === '/bebidas'
      || pathname === '/explorar/comidas/area') {
      return (
        <button
          className="header_search-btn"
          type="button"
          onClick={ () => toggleSearch(!searchInput) }
        >
          <img
            className="header__scaleAnim"
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
    <div className="header">
      <div className="header__form-btn__container">
        { isHeaderPresent() }
        { searchInput && (
          (
            <Search />
          )
        )}
      </div>

      <h1 className="header__title" data-testid="page-title">{ title }</h1>
      <div>
        <Link to="/perfil">
          <img
            className="header__scaleAnim"
            src={ profileIcon }
            alt="profile icon"
            data-testid="profile-top-btn"
          />
        </Link>
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
