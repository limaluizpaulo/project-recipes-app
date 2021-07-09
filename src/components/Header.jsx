import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../App.css';
import ContextRecipes from '../context/contextRecipes';

function Header({ history }) {
  const { goSearch, setGoSearch, title } = useContext(ContextRecipes);
  const goProfile = () => (
    history.push('/perfil')
  );

  return (
    <header className="food-header">
      <input
        type="image"
        src={ profileIcon }
        alt="Profile icon"
        data-testid="profile-top-btn"
        onClick={ goProfile }
      />
      <h2 data-testid="page-title">{ title }</h2>
      <input
        type="image"
        data-testid="search-top-btn"
        src={ searchIcon }
        onClick={ () => setGoSearch(!goSearch) }
        alt="search icon"
      />
    </header>
  );
}

Header.propTypes = {
  history: PropTypes.objectOf(PropTypes.objectOf).isRequired,
};

export default Header;
