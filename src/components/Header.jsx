import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import './header.css';
import ContextRecipes from '../context/contextRecipes';

function Header({ history }) {
  const { goSearch, setGoSearch } = useContext(ContextRecipes);
  const goProfile = () => (
    // <Redirect to="/profile" />
    history.push('/profile')
  );

  return (
    <header className="food-header">
      <button
        type="button"
        data-testid="profile-top-btn"
        onClick={ goProfile }
      >
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

Header.propTypes = {
  history: PropTypes.node.isRequired,
};

export default Header;
