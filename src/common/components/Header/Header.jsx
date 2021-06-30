import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import profileIcon from '../../../images/profileIcon.svg';
import searchIcon from '../../../images/searchIcon.svg';
import './header.css';

export default function Header() {
  const [isRedirect, setIsRedirect] = useState(false);
  const [showSearchBar, setBar] = useState(true);

  if (isRedirect) return <Redirect to="/perfil" />;

  return (
    <header>
      <button
        type="button"
        onClick={ () => setIsRedirect(true) }
      >
        <img
          src={ profileIcon }
          alt="perfil"
          data-testid="profile-top-btn"
        />
      </button>
      <h1
        data-testid="page-title"
      >
        Comida
      </h1>
      <div>
        <button
          type="button"
          onClick={ () => setBar(!showSearchBar) }
        >
          <img
            src={ searchIcon }
            alt="busca"
            data-testid="search-top-btn"
          />
        </button>
        { showSearchBar
          || <input
            type="text"
            name="search"
            id="search-bar"
            placeholder="Pesquise uma receita..."
          /> }
      </div>
    </header>
  );
}
