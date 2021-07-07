import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import profileImg from '../images/profileIcon.svg';
import searchImg from '../images/searchIcon.svg';

import SearchBar from './SearchBar';

function Header({ search, profile, name }) {
  const [dropDown, setDropDown] = useState(false);

  function showSearchBar() {
    setDropDown(!dropDown);
  }

  return (
    <div>
      <div className="mt-2 d-flex justify-content-around">
        {profile && (
          <button type="button">
            <Link to="/perfil">
              <img
                src={ profileImg }
                alt="Ir para perfil"
                data-testid="profile-top-btn"
              />
            </Link>
          </button>
        )}
        {name && (
          <p data-testid="page-title">{ name }</p>
        )}
        {search && (
          <button type="button" onClick={ showSearchBar }>
            <img src={ searchImg } alt="Buscar receita" data-testid="search-top-btn" />
          </button>
        )}
      </div>
      { dropDown && <SearchBar />}
    </div>
  );
}

Header.propTypes = {
  name: PropTypes.string,
  search: PropTypes.bool,
  profile: PropTypes.bool,
}.isRequired;

export default Header;
