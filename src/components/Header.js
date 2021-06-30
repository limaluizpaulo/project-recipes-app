import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import iconProfile from '../images/profileIcon.svg';
import iconSearch from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

const Header = ({ search, title }) => {
  const [searchInput, toggleSearch] = useState();

  return (
    <div>
      <h1 data-testid="page-title">{title}</h1>
      <Link to="/perfil">
        <img
          src={ iconProfile }
          alt="profile"
          type="button"
          data-testid="profile-top-btn"
        />
      </Link>
      {search && (
        <button type="button" onClick={ () => toggleSearch(!searchInput) }>
          <img
            src={ iconSearch }
            alt="search"
            type="button"
            data-testid="search-top-btn"
          />
        </button>
      )}
      { searchInput && <SearchBar />}
    </div>
  );
};

Header.defaultProps = {
  search: false,
  title: '',
};

Header.propTypes = {
  search: PropTypes.bool,
  title: PropTypes.string,
};

export default Header;
