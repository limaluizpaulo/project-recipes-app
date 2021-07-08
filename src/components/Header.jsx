import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import arrangeTitle from '../services/getPageTitle';

function Header() {
  const { pathname } = window.location;
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
        </Link>
        <p
          data-testid="page-title"
        >
          { pageTitle }
        </p>
        {showSearchBtn
        && (
          <button
            type="button"
            onClick={ () => showSearchBar() }
          >
            <img
              data-testid="search-top-btn"
              src={ searchIcon }
              alt="search icon"
            />
          </button>
        )}
      </main>
      <article>
        { shouldShearchBar && <SearchBar title={ pageTitle } /> }
      </article>
    </header>
  );
}

export default Header;
