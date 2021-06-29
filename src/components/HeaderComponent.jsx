import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function HeaderComponent() {
  const [shouldShearchBar, setShouldSearchBar] = useState(false);

  const showSearchBar = () => setShouldSearchBar(!shouldShearchBar);

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
          Comidas
        </p>
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
      </main>
      <article>
        { shouldShearchBar && <SearchBar /> }
      </article>
    </header>
  );
}

export default HeaderComponent;
