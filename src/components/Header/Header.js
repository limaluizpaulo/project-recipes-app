import React, { useState } from 'react';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import './header.css';

function Header(props) {
  const [searchField, setSearchField] = useState(false);
  const [inputSearch, setInputSearch] = useState('');

  console.log(props);

  const search = () => (
    <input
      type="text"
      value={ inputSearch }
      onChange={ ({ target: { value } }) => setInputSearch(value) }
    />
  );

  const pageTitle = () => (
    <h1 data-testid="page-title">page title</h1>
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

export default Header;
