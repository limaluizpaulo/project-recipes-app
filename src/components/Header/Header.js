import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import './header.css';

function Header({ title, haveSrc }) {
  const history = useHistory();
  const [searchField, setSearchField] = useState(false);
  const [inputSearch, setInputSearch] = useState('');
  console.log(haveSrc);
  const search = () => (
    <input
      type="text"
      value={ inputSearch }
      data-testid="search-input"
      onChange={ ({ target: { value } }) => setInputSearch(value) }
    />
  );

  const pageTitle = () => (
    <h1 data-testid="page-title">{ title }</h1>
  );

  return (
    <header className="Header">
      <button
        type="button"
        onClick={ () => history.push('/perfil') }
      >
        <img src={ profileIcon } alt="profile icon" data-testid="profile-top-btn" />
      </button>

      {searchField ? search() : pageTitle()}

      {
        haveSrc ? (
          <button
            type="button"
            onClick={ () => (searchField ? setSearchField(false) : setSearchField(true)) }
          >
            <img src={ searchIcon } alt="profile icon" data-testid="search-top-btn" />
          </button>
        ) : (<di />)
      }

    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  haveSrc: PropTypes.bool.isRequired,
};

export default Header;
