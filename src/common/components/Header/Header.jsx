import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchBar from '../SearchBar';

import profileIcon from '../../../images/profileIcon.svg';
import searchIcon from '../../../images/searchIcon.svg';
import './header.css';

export default function Header({ pageName }) { // Desestruturação de props
  const [isRedirect, setIsRedirect] = useState(false); // Redirect Perfil
  const [showSearchBar, setBar] = useState(false); // state component to search

  if (isRedirect) return <Redirect to="/perfil" />;

  return (
    <>
      <header>
        <input
          type="image"
          onClick={ () => setIsRedirect(true) }
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="perfil"
          title="Perfil"
        />
        <h1
          data-testid="page-title"
        >
          { pageName }
        </h1>
        <div>
          <input
            className="search"
            title="Pesquisar"
            type="image"
            onClick={ () => setBar(!showSearchBar) }
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="search"
          />
        </div>
      </header>
      <div>
        { !showSearchBar || <SearchBar />}
      </div>
    </>
  );
}

Header.propTypes = {
  pageName: PropTypes.string.isRequired,
};
