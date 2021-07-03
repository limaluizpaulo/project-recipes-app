import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import SearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import './Header.css';

function Header({ title, showSearchIcon = true }) {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const history = useHistory();

  return (
    <header>
      <div>
        <button
          type="button"
          className="button-svg"
          onClick={ () => history.push('/perfil') }
        >
          <img src={ profileIcon } alt="Profile" data-testid="profile-top-btn" />
        </button>
        <h2 data-testid="page-title">{title}</h2>
        {showSearchIcon && (
          <button
            type="button"
            className="button-svg"
            onClick={ () => setShowSearchBar(!showSearchBar) }
          >
            <img src={ searchIcon } alt="Search" data-testid="search-top-btn" />
          </button>
        )}
      </div>
      {showSearchBar && <SearchBar /> }
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Header;
