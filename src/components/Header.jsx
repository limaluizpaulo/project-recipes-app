import React, { useState } from 'react';
// import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header(props) {
  const { title, searchBar } = props;

  const [showSearch, setShowSearch] = useState(false);

  const showSearchChange = () => {
    if (showSearch === false) setShowSearch(true);
    else setShowSearch(false);
  };
  const searchBarInput = showSearch ? (
    <form htmlFor="seachBar">
      <input id="searchBar" type="text" data-testid="search-input" />
      <label htmlFor="ingredients-radio">
        Ingredientes
        <input
          name="search-radios"
          type="radio"
          id="ingredients-radio"
          data-testid="ingredient-search-radio"
          value="ingredients"
          checked
        />
      </label>
      <label htmlFor="name-radio">
        Nome
        <input
          name="search-radios"
          type="radio"
          id="name-radio"
          data-testid="name-search-radio"
          value="name"
        />
      </label>
      <label htmlFor="firstLetter-radio">
        Primeira Letra
        <input
          name="search-radios"
          type="radio"
          id="firstLetter-radio"
          data-testid="first-letter-search-radio"
          value="firstLetter"
        />
      </label>
    </form>
  ) : null;

  return (
    <header>
      <Link to="/perfil">
        <img src={ profileIcon } alt="profile" data-testid="profile-top-btn" />
      </Link>
      <h1 data-testid="page-title">{title}</h1>
      {searchBarInput}
      {searchBar && (
        <button onClick={ showSearchChange } type="button" data-testid="exec-search-btn">
          <img src={ searchIcon } alt="search button" data-testid="search-top-btn" />
        </button>
      ) }
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  searchBar: PropTypes.bool.isRequired,
};

export default Header;
