import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ title }) {
  const [displaySearch, setDisplaySearch] = useState(false);

  const renderSearch = () => (
    <button
      type="button"
      onClick={ () => setDisplaySearch(!displaySearch) }
    >
      <img
        src={ searchIcon }
        alt="Explore"
        data-testid="search-top-btn"
      />
    </button>
  );

  return (
    <div>
      <Link to="/perfil">
        <img
          src={ profileIcon }
          alt="Profile"
          data-testid="profile-top-btn"
        />
      </Link>
      <h1 data-testid="page-title">{title}</h1>
      {
        title === 'Comidas'
      || title === 'Bebidas'
      || title === 'Explorar Origem'
          ? renderSearch() : false
      }
      { displaySearch
        ? (
          <SearchBar />
        )
        : false}
    </div>
  );
}
Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
