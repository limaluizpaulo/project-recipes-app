import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import profileIcon from '../../../images/profileIcon.svg';
import searchIcon from '../../../images/searchIcon.svg';
import './header.css';

export default function Header() {
  const [isRedirect, setIsRedirect] = useState(false);

  if (isRedirect) return <Redirect to="/perfil" />;

  return (
    <header>
      <button
        type="button"
        onClick={ () => setIsRedirect(true) }
      >
        <img src={ profileIcon } alt="perfil" data-testid="profile-top-btn" />
      </button>
      <h1 data-testid="page-title">Comida</h1>
      <button type="button">
        <img src={ searchIcon } alt="busca" data-testid="search-top-btn" />
      </button>
    </header>
  );
}
