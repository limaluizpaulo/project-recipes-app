import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import Search from './SearchBar';
import '../styles/Header.css';

export default function Header(props) {
  const [searchBarClass, setSearchBarClass] = useState(false);
  const { title } = props;

  return (
    <>
      <header className="header-container">
        <div>
          <Link to="/perfil">
            <img src={ profileIcon } alt="profile" data-testid="profile-top-btn" />
          </Link>
        </div>
        <div>
          <h1 data-testid="page-title">{title}</h1>
        </div>
        <div>
          <button type="button" onClick={ () => { setSearchBarClass(!searchBarClass); } }>
            <img src={ searchIcon } alt="search" data-testid="search-top-btn" />
          </button>
        </div>
      </header>
      <section className={ searchBarClass ? 'show' : 'hidden' }>
        <Search />
      </section>
    </>
  );
}

Header.propTypes = PropTypes.string.isRequired;
