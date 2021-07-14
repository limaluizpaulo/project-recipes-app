import React, { useState } from 'react';
import { // useParams,
  Link,
  useRouteMatch,
} from 'react-router-dom';

import { Navbar, Container } from 'react-bootstrap';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import '../styles/header.css';

export default function Header() {
  const { path } = useRouteMatch();
  const [isHidden, setHidden] = useState(true);

  // Source: https://stackoverflow.com/questions/26574388/boolean-logic-in-switch-case-statement-java/26574416

  // function dinamicSearchBar() {
  //   setHidden(!(isHidden));
  // }

  function getTitle() {
    const title = path.replace(/\W/g, ' ')
      .split(' ').map((word) => (
        word.replace(/\w/, (char) => char.toUpperCase())))
      .join(' ')
      .replace(' ', '');

    if (path.includes('/ingredientes')) { return 'Explorar Ingredientes'; }
    if (path.includes('/area')) { return 'Explorar Origem'; }
    return (path && title);
  }

  function imageRendering() {
    switch (path) {
    case '/comidas':
    case '/bebidas':
    case '/explorar/comidas/area':
      return (
        <section className="container-header-search">
          <Navbar className="container-header">
            <Container>
              <Link to="/perfil">
                <img
                  data-testid="profile-top-btn"
                  src={ profileIcon }
                  alt="profile-icon"
                />
              </Link>
              <Navbar.Brand href="/">
                <h1 class-name="title-header" data-testid="page-title">{ getTitle() }</h1>
              </Navbar.Brand>
              <button
                type="button"
                onClick={ () => setHidden(!(isHidden)) }
                className="button-search-icon"
              >
                <img
                  data-testid="search-top-btn"
                  src={ searchIcon }
                  alt="search-icon"
                />
              </button>
            </Container>
          </Navbar>
          {!isHidden && (<SearchBar />)}
        </section>);
    case '/explorar':
    case '/explorar/comidas':
    case '/explorar/comidas/ingredientes':
    case '/explorar/bebidas/ingredientes':
    case '/explorar/bebidas':
    case '/receitas-feitas':
    case '/receitas-favoritas':
    case '/perfil':
      return (
        <Navbar className="container-header">
          <Container>
            <Link to="/perfil">
              <img data-testid="profile-top-btn" src={ profileIcon } alt="" />
            </Link>
            <h1 className="search-icon" data-testid="page-title">{ getTitle() }</h1>
          </Container>
        </Navbar>
      );
    default:
      return ('');
    }
  }

  return (
    <header>
      {imageRendering()}
    </header>
  );
}
