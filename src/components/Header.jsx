import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import './header.css';
import '../App.css';
import ContextRecipes from '../context/contextRecipes';

function Header({ history, show }) {
  const { goSearch, setGoSearch, title } = useContext(ContextRecipes);
  const goProfile = () => (
    history.push('/perfil')
  );

  return (
    <header className="food-header">
      <input
        type="image"
        data-testid="profile-top-btn"
        onClick={ goProfile }
        src={ profileIcon }
        alt="Profile Icon"
        width="45"
      />
      <h2 data-testid="page-title">{ title }</h2>
      { show && <input
        type="image"
        id="search-top-btn"
        data-testid="search-top-btn"
        onClick={ () => setGoSearch(!goSearch) }
        src={ searchIcon }
        alt="Search Icon"
        width="45"
      />}
    </header>
  );
}

Header.propTypes = {
  history: PropTypes.objectOf(PropTypes.objectOf).isRequired,
  show: PropTypes.bool,
};

Header.defaultProps = {
  show: false,
};

export default Header;
