import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import RecipeContext from '../context';

function Header({ title }) {
  const history = useHistory();
  const { showSearch, setShowSearch } = useContext(RecipeContext);

  const handleClick = () => {
    history.push('/perfil');
  };

  return (
    <div>
      <button
        type="button"
        data-testid="profile-top-btn"
        src={ profileIcon }
        onClick={ handleClick }
      >
        <img src={ profileIcon } alt="profile icon" />
      </button>

      <h2 data-testid="page-title">{title}</h2>

      <button
        type="button"
        src={ searchIcon }
        onClick={ () => setShowSearch(!showSearch) }
      >
        <img src={ searchIcon } alt="search icon" data-testid="search-top-btn" />
      </button>

    </div>
  );
}

export default Header;
