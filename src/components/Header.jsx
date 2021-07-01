import React, { useState } from 'react';
// import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import Input from '../helpers/Input';
import Button from '../helpers/Button';

function Header(props) {
  const { title, searchBar } = props;

  const [showSearch, setShowSearch] = useState(false);

  const showSearchChange = () => {
    if (showSearch === false) setShowSearch(true);
    else setShowSearch(false);
  };
  const searchBarInput = showSearch ? (
    <form htmlFor="seachBar">
      <Input
        id="searchBar"
        type="text"
        testid="search-input"
      />
      <Input
        name="search-radios"
        htmlFor="ingredients-radio"
        label="Ingredientes"
        testid="ingredient-search-radio"
        id="ingredients-radio"
        type="radio"
        value="ingredients"
        checked
      />
      <Input
        htmlFor="name-radio"
        label="Nome"
        name="search-radios"
        type="radio"
        id="name-radio"
        testid="name-search-radio"
        value="name"
      />
      <Input
        htmlFor="firstLetter-radio"
        label="Primeira letra"
        name="search-radios"
        type="radio"
        id="firstLetter-radio"
        testid="first-letter-search-radio"
        value="firstLetter"
      />
      <Button testid="exec-search-btn" label="Buscar" />
    </form>
  ) : null;

  return (
    <div>
      <header>
        <Link to="/perfil">
          <img src={ profileIcon } alt="profile" data-testid="profile-top-btn" />
        </Link>
        <h1 data-testid="page-title">{title}</h1>
        {searchBar && (
          <button
            onClick={ showSearchChange }
            type="button"
          >
            <img src={ searchIcon } alt="search button" data-testid="search-top-btn" />
          </button>
        ) }
      </header>
      {searchBarInput}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  searchBar: PropTypes.bool.isRequired,
};

export default Header;
