import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

import '../styles/header.css';

function Header() {
  const [inputDisplay, setInputDisplay] = useState(false);
  const history = useHistory();
  const path = history.location.pathname;
  const paginas = {
    '/comidas': 'Comidas',
    '/bebidas': 'Bebidas',
    '/explorar/comidas/area': 'Explorar Origem',
    '/explorar/comidas': 'Explorar Comidas',
    '/explorar/bebidas': 'Explorar Bebidas',
    '/explorar/comidas/ingredientes': 'Explorar Ingredientes',
    '/explorar/bebidas/ingredientes': 'Explorar Ingredientes',
    '/receitas-feitas': 'Receitas Feitas',
    '/receitas-favoritas': 'Receitas Favoritas',
    '/perfil': 'Perfil',
    '/explorar': 'Explorar',
  };

  function handleSearch() {
    if (inputDisplay === false) {
      setInputDisplay(true);
    } else {
      setInputDisplay(false);
    }
  }

  return (
    <div>
      <header className="header-bar">
        <Link to="/perfil">
          <img
            src={ profileIcon }
            alt="icone do perfil"
            data-testid="profile-top-btn"
          />
        </Link>
        <h2
          data-testid="page-title"
        >
          { paginas[path] }
        </h2>
        { path === '/comidas' || path === '/bebidas' || path === '/explorar/comidas/area'
          ? (
            <button
              type="button"
              src={ searchIcon }
              onKeyDown={ handleSearch }
              onClick={ handleSearch }
              data-testid="search-top-btn"
            >
              <img
                src={ searchIcon }
                alt="icone de busca"
              />
            </button>
          )
          : <div /> }
      </header>
      { inputDisplay ? <SearchBar /> : null }
    </div>
  );
}

export default Header;
