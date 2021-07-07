import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

import profileImg from '../images/profileIcon.svg';
import searchImg from '../images/searchIcon.svg';
import '../styles/Header.css';

function Header({ search, name }) {
  const [dropDown, setDropDown] = useState(false);

  function showSearchBar() {
    setDropDown(!dropDown);
  }

  return (
    <div>
      <div className="main-header">
        <button type="button">
          <Link to="/perfil">
            <img
              className="profile-pic"
              src={ profileImg }
              alt="Ir para perfil"
              data-testid="profile-top-btn"
            />
          </Link>
        </button>
        <h5 className="page-title" data-testid="page-title">{ name }</h5>
        {search ? (
          <button className="search-pic" type="button" onClick={ showSearchBar }>
            <img
              src={ searchImg }
              alt="Buscar receita"
              data-testid="search-top-btn"
            />
          </button>
        ) : <span />}
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
