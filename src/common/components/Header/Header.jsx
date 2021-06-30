import React from 'react';
import profileIcon from '../../../images/profileIcon.svg';
import searchIcon from '../../../images/searchIcon.svg';
import './header.css';

export default function Header() {
  return (
    <header>

      <img src={ profileIcon } alt="perfil" data-testid="profile-top-btn" />
      <h1 data-testid="page-title">Comida</h1>
      <img src={ searchIcon } alt="busca" data-testid="search-top-btn" />

    </header>
  );
}
