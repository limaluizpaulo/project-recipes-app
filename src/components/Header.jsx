import React, { useState } from 'react';
// import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header(props) {
  const { title, hasSearchBar } = props;

  const [showSearch, setShowSearch] = useState(false);

  const showSearchChange = () => {
    setShowSearch((previousState) => !previousState);
  };

  return (
    <div>
      <header>
        <Link to="/perfil">
          <img src={ profileIcon } alt="profile" data-testid="profile-top-btn" />
        </Link>
        <h1 data-testid="page-title">{title}</h1>
        {hasSearchBar && (
          <button
            onClick={ showSearchChange }
            type="button"
          >
            <img src={ searchIcon } alt="search button" data-testid="search-top-btn" />
          </button>
        ) }
      </header>
      {showSearch && (
        <SearchBar />
      )}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  hasSearchBar: PropTypes.bool.isRequired,
};

export default Header;
