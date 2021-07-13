import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import Lupa from './Lupa';
// import RecipesContext from '../Context/RecipesContext';

function Header() {
  const [toggleSearch, setToggleSearch] = useState(false);
  // const { setRedirect } = useContext(RecipesContext);
  const history = useHistory();
  const { pathname } = useLocation();
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
        <button
          type="button"
          // className={  }
          onClick={ () => setToggleSearch(!toggleSearch) }
        >
          <img src={ searchIcon } alt="ícone de buscar" data-testid="search-top-btn" />
        </button>
      );
    }
  };

  return (
    <>
      <header>
        <Navbar>
          <button
            type="button"
            onClick={ () => {
              history.push('/perfil');
            } }
          >
            <img
              src={ profileIcon }
              alt="ícone de perfil"
              data-testid="profile-top-btn"
            />
          </button>
          <Navbar.Collapse className="justify-content-end">
            <h1 data-testid="page-title">{ condicionRenderingTitle() }</h1>
            { condicionRenderSearchBar() }
          </Navbar.Collapse>
        </Navbar>
      </header>
      { toggleSearch && <Lupa /> }
    </>
  );
}

export default Header;

// <Navbar.Collapse className="justify-content-end">
//     <Navbar.Text>
//       Signed in as: <a href="#login">Mark Otto</a>
//     </Navbar.Text>
//   </Navbar.Collapse>
