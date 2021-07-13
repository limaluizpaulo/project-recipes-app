import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AiOutlineUser, AiOutlineSearch } from 'react-icons/ai';
import { RiHome2Line } from 'react-icons/ri';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import arrangeTitle from '../services/getPageTitle';
import './css/header.css';

function Header({ pathname, newRecipes }) {
  const [shouldShearchBar, setShouldSearchBar] = useState(false);
  const [pageTitle, setPageTitle] = useState('');
  const showSearchBar = () => setShouldSearchBar(!shouldShearchBar);
  const showSearchBtn = pathname === '/comidas'
  || pathname === '/bebidas'
  || pathname === '/explorar/comidas/area';

  useEffect(() => {
    setPageTitle(arrangeTitle());
  }, []);

  return (
    <header>
      <main>
        <Link to="/perfil">
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="user frame"
          />
          <AiOutlineUser />
        </Link>
        <p
          data-testid="page-title"
          className="page-title"
        >
          { pageTitle }
        </p>
        {showSearchBtn
          ? (
            <button
              type="button"
              onClick={ () => showSearchBar() }
            >
              <img
                data-testid="search-top-btn"
                src={ searchIcon }
                alt="search icon"
              />
              <AiOutlineSearch />
            </button>
          )
          : (
            <button
              type="button"
              onClick={ () => showSearchBar() }
            >
              <img
                data-testid="search-top-btn"
                src={ searchIcon }
                alt="search icon"
              />
              <RiHome2Line />
            </button>
          ) }
      </main>
      <article>
        { shouldShearchBar
        && <SearchBar title={ pageTitle } newRecipes={ newRecipes } /> }
      </article>
    </header>
  );
}

Header.propTypes = {
  pathname: PropTypes.string.isRequired,
  newRecipes: PropTypes.func.isRequired,
};

export default Header;
