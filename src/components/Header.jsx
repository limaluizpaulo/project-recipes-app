import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const history = useHistory();
  const { pathname } = useLocation();
  // test
  const condicionRenderingTitle = () => {
    switch (pathname) {
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
      return 'Explorar Ingredientes Comidas';
    case '/explorar/bebidas/ingredientes':
      return 'Explorar Ingredientes Bebidas';
    case '/explorar/comidas/area':
      return 'Explorar Origem';
    case '/receitas-feitas':
      return 'Receitas Feitas';
    case '/receitas-favoritas':
      return 'Receitas Favoritas';
    case '/perfil':
      return 'Perfil';
    default:
      return history.push('/notfound');
    }
  };

  const condicionRenderSearchBar = () => {
    if (pathname === '/comidas'
    || pathname === '/bebidas'
    || pathname === '/explorar/comidas/area') {
      return (
        <button type="button">
          <img src={ searchIcon } alt="ícone de buscar" data-testid="search-top-btn" />
        </button>
      );
    }
  };

  return (
    <header>
      <button
        type="button"
        onClick={ () => {
          history.push('/perfil');
        } }
      >
        <img src={ profileIcon } alt="ícone de perfil" data-testid="profile-top-btn" />
      </button>
      <h1 data-testid="page-title">{ condicionRenderingTitle() }</h1>
      { condicionRenderSearchBar() }
    </header>
  );
}

export default Header;
