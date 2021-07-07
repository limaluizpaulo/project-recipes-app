import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

const Header = ({ name, search, children, dropDown }) => {
  const [bar, setBar] = useState(false);
  const [drop, setDrop] = useState(false);

  return (
    <header>
      <Link to="/perfil">
        <img src={ profileIcon } alt="profileIcon" data-testid="profile-top-btn" />
      </Link>

      <h1 data-testid="page-title">{ name }</h1>

      { search && (
        <button
          type="button"
          onClick={ () => ((dropDown) ? setDrop(!drop) : setBar(!bar)) }
        >
          <img
            src={ searchIcon }
            alt="profileIcon"
            data-testid="search-top-btn"
          />
        </button>
      )}

      {bar ? children : ''}
    </header>
  );
};

Header.propTypes = {
  name: PropTypes.string,
  search: PropTypes.bool,
}.isRequired;

export default Header;
