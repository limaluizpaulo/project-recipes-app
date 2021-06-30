import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchInput from './SearchInput';

function Header() {
  const paginaAtual = useLocation().pathname;
  const [searchInput, setSearchInput] = useState(false);

  const handleSearch = () => {
    setSearchInput(!searchInput);
  };

  const titleHeader = () => {
    switch (paginaAtual) {
    case '/comidas':
      return 'Comidas';
    case '/bebidas':
      return 'Bebidas';
    case '/explorar':
      return 'Explorar';
    case '/explorar/comidas':
      return 'Explorar Comidas';
    case '/explorar/bebidas':
      return 'Explorar Bebidas';
    case '/explorar/comidas/ingredientes':
      return 'Explorar Ingredientes';
    case '/explorar/bebidas/ingredientes':
      return 'Explorar Ingredientes';
    case '/explorar/comidas/area':
      return 'Explorar Origem';
    case '/perfil':
      return 'Perfil';
    case '/receitas-feitas':
      return 'Receitas Feitas';
    case '/receitas-favoritas':
      return 'Receitas Favoritas';
    default:
      return '';
    }
  };

  const searchIconFun = () => {
    if (paginaAtual === '/comidas'
      || paginaAtual === '/bebidas'
      || paginaAtual === '/explorar/comidas/area'
    ) {
      return (
        <button
          type="button"
          onClick={ handleSearch }
        >
          <img
            alt="Search"
            data-testid="search-top-btn"
            src={ searchIcon }
          />
        </button>
      );
    }
  };

  return (
    <header className="containerHeader">
      <section className="headerSection">
        <Link to="/perfil">
          <img alt="Profile" data-testid="profile-top-btn" src={ profileIcon } />
        </Link>
        <h1 data-testid="page-title">{ titleHeader() }</h1>
        { searchIconFun() }
      </section>
      { searchInput ? <SearchInput /> : false }
    </header>
  );
}

export default Header;
