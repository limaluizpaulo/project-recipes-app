import React, { useContext } from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import './header.css';
import ContextRecipes from '../context/contextRecipes';

function Header() {
  const { goSearch, setGoSearch } = useContext(ContextRecipes);
  return (
    <header className="food-header">
      <button type="button" data-testid="profile-top-btn">
        <img src={ profileIcon } alt="Profile Icon" />
      </button>
      <h2 data-testid="page-title">Comidas</h2>
      <button
        type="button"
        data-testid="search-top-btn"
        onClick={ () => setGoSearch(!goSearch) }
      >
        <img src={ searchIcon } alt="Search Icon" />
      </button>
    </header>
  );
}

export default Header;
