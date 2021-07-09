import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import SearchBar from './SearchBar';
import profileIcon from '../svg/profileIcon.svg';
import searchIcon from '../svg/searchIcon.svg';
import './Header.css';

function Header({ title, showSearchIcon = true }) {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const history = useHistory();

  function renderSearchButton() {
    return (
      <button
        type="button"
        className="svg-button"
        onClick={ () => setShowSearchBar(!showSearchBar) }
      >
        <img
          className="svg-med"
          src={ searchIcon }
          alt="Search"
        />
      </button>
    );
  }

  function renderProfileButton() {
    return (
      <button
        type="button"
        className="svg-button"
        onClick={ () => history.push('/perfil') }
      >
        <img
          className="svg-med"
          src={ profileIcon }
          alt="Profile"
        />
      </button>
    );
  }

  return (
    <header>
      <section>
        {showSearchIcon && renderSearchButton()}
        <h2>{title}</h2>
        {renderProfileButton()}
      </section>
      {showSearchBar && <SearchBar />}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Header;
