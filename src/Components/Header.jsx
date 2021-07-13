import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/logo_size.jpg';
import searchIcon from '../images/searchIcon.svg';

export default function Header(props) {
  const { title, setSearchBar, searchBar } = props;
  return (
    <header className="header-principal">
      <div>
        <Link to="/perfil">
          <img
            className="logo-size"
            src={ profileIcon }
            alt="profile"
            data-testid="profile-top-btn"
          />
        </Link>
      </div>
      <div>
        <h1 className="titulos" data-testid="page-title">{title}</h1>
      </div>
      <div>
        <button
          className="btn-search"
          type="button"
          onClick={ () => { setSearchBar(!searchBar); } }
        >
          <img src={ searchIcon } alt="search" data-testid="search-top-btn" />
        </button>
      </div>
    </header>
  );
}

Header.propTypes = PropTypes.string.isRequired;
