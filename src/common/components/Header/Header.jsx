import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import profileIcon from '../../../images/profileIcon.svg';
import searchIcon from '../../../images/searchIcon.svg';
import './header.css';

export default function Header({ pageName }) { // Desestruturação de props
  const [isRedirect, setIsRedirect] = useState(false);
  const [showSearchBar, setBar] = useState(true);

  if (isRedirect) return <Redirect to="/perfil" />;

  return (
    <header>
      <input
        type="image"
        onClick={ () => setIsRedirect(true) }
        data-testid="profile-top-btn"
        src={ profileIcon }
        alt="perfil"
      />
      <h1
        data-testid="page-title"
      >
        { pageName }
      </h1>
      <div>
        <input
          type="image"
          onClick={ () => setBar(!showSearchBar) }
          data-testid="search-top-btn"
          src={ searchIcon }
          alt="search"
        />
        { showSearchBar
          || <input
            type="text"
            name="search"
            id="search-bar"
            placeholder="Pesquise uma receita..."
            data-testid="search-input"
          /> }
      </div>
    </header>
  );
}

Header.propTypes = {
  pageName: PropTypes.string.isRequired,
};
