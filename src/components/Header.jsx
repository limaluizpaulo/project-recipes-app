import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const paginaAtual = useLocation().pathname.replace('/', '');
  const paginaAtualUpper = paginaAtual[0].toUpperCase() + paginaAtual.substr(1);

  return (
    <header className="containerHeader">
      <Link to="/perfil">
        <img alt="Profile" data-testid="profile-top-btn" src={ profileIcon } />
      </Link>
      <h1 data-testid="page-title">{ paginaAtualUpper }</h1>
      <Link to="explorar">
        <img alt="Search" data-testid="search-top-btn" src={ searchIcon } />
      </Link>
    </header>
  );
}

export default Header;
