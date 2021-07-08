import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';

export default function Header({ title, search = false }) {
  const [searchBar, setSearchBar] = useState(false);
  return (
    <>
      <header data-testid="header-top">
        <Link to="/perfil">
          <img src={ profileIcon } alt="profile icon" data-testid="profile-top-btn" />
        </Link>
        <p className="page-title" data-testid="page-title">{title}</p>
        {search
      && (
        <button type="button" onClick={ () => setSearchBar(!searchBar) }>
          <img src={ searchIcon } alt="search icon" data-testid="search-top-btn" />
        </button>
      )}
      </header>
      {searchBar && <SearchBar /> }
    </>
  );
}

Header.defaultProps = {
  search: false,
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  search: PropTypes.bool,
};
