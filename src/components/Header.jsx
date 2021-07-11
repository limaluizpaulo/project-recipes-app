import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';

export default function Header({ title, search = false }) {
  const [searchBar, setSearchBar] = useState(false);
  return (
    <section className="navbar-header">
      <header data-testid="header-top">
        <Link to="/perfil">
          <img src={ profileIcon } alt="profile icon" data-testid="profile-top-btn" />
        </Link>
        <p className="page-title" data-testid="page-title">{title}</p>
        {search
      && (
        <button
          type="button"
          data-testid="show-btn"
          onClick={ () => setSearchBar(!searchBar) }
          className="button-search"
        >
          <img src={ searchIcon } alt="search icon" data-testid="search-top-btn" />
        </button>
      )}
      </header>
      {searchBar && <SearchBar /> }
    </section>
  );
}

Header.defaultProps = {
  search: false,
  title: null,
};

Header.propTypes = {
  title: PropTypes.string,
  search: PropTypes.bool,
};
