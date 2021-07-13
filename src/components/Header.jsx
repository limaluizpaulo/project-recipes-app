import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import './header.css';
import '../App.css';
import ContextRecipes from '../context/contextRecipes';

function Header({ history }) {
  const { goSearch, setGoSearch, title } = useContext(ContextRecipes);
  const goProfile = () => (
    history.push('/perfil')
  );

  // const { location: { pathname } } = history;
  // switch (title) {
  //   case pathname === title

  //     break;

  //   default:
  //     break;
  // }

  return (
    <header className="food-header">
      <button
        className="normal-button"
        type="button"
        data-testid="profile-top-btn"
        onClick={ goProfile }
      >
        <img src={ profileIcon } alt="Profile Icon" />
      </button>
      <h2 data-testid="page-title">{ title }</h2>
      <button
        className="normal-button"
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
  history: PropTypes.objectOf(PropTypes.objectOf).isRequired,
};

export default Header;
