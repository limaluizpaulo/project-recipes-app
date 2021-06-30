import React, { useState } from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import './header.css';

function Header({ title }) {
  const [searchField, setSearchField] = useState(false);
  const [inputSearch, setInputSearch] = useState('');

  const search = () => (
    <input
      type="text"
      value={ inputSearch }
      onChange={ ({ target: { value } }) => setInputSearch(value) }
    />
  );

  const pageTitle = () => (
    <h1 data-testid="page-title">{title}</h1>
  );

  return (
    <header className="Header">
      <button type="button" data-testid="profile-top-btn">
        <img src={ profileIcon } alt="profile icon" />
      </button>

      {searchField ? search() : pageTitle()}

      <button
        type="button"
        data-testid="search-top-btn"
        onClick={ () => (searchField ? setSearchField(false) : setSearchField(true)) }
      >
        <img src={ searchIcon } alt="profile icon" />
      </button>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
