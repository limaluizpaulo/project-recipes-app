import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ pathname }) {
  const [shouldShearchBar, setShouldSearchBar] = useState(false);
  const [pageTitle, setPageTitle] = useState(pathname);
  const showSearchBar = () => setShouldSearchBar(!shouldShearchBar);

  useEffect(() => {
    let title = '';
    const arrangeTitle = () => {
      const withoutSlash = pathname.split('/')[1];
      title = `${withoutSlash[0].toUpperCase()}${withoutSlash.slice(1)}`;
      setPageTitle(title);
    };

    arrangeTitle();
  }, [pathname]);

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
        { shouldShearchBar && <SearchBar title={ pageTitle } /> }
      </article>
    </header>
  );
}

Header.propTypes = {
  pathname: PropTypes.objectOf().isRequired,
};

export default Header;
