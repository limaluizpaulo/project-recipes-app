import React, { useState } from 'react';
import { // useParams,
  useRouteMatch,
} from 'react-router-dom';

import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

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
        <Navbar bg="dark" variant="dark">
          <Container>
            <Nav.Link href="/perfil">
              <img data-testid="profile-top-btn" src={ profileIcon } alt="profile-icon" />
            </Nav.Link>
            <Navbar.Brand href="/">
              <h1 data-testid="page-title">{ getTitle() }</h1>
            </Navbar.Brand>
            <button
              type="button"
              onClick={ () => setHidden(!(isHidden)) }
            >
              <img data-testid="search-top-btn" src={ searchIcon } alt="search-icon" />
            </button>
            {!isHidden && (
              <div className="search-container">
                <input type="text" data-testid="search-input" />
                <input type="radio" data-testid="ingredient-search-radio" />
                <input type="radio" data-testid="name-search-radio" />
                <input type="radio" data-testid="first-letter-search-radio" />
                <Button type="button" data-testid="exec-search-btn">Search</Button>
              </div>)}
          </Container>
        </Navbar>);
    case '/explorar':
    case '/explorar/comidas':
    case '/explorar/comidas/ingredientes':
    case '/explorar/bebidas/ingredientes':
    case '/explorar/bebidas':
    case '/receitas-feitas':
    case '/receitas-favoritas':
    case '/perfil':
      return (
        <Navbar bg="dark" variant="dark">
          <Container>
            <Nav.Link href="/perfil">
              <img data-testid="profile-top-btn" src={ profileIcon } alt="" />
            </Nav.Link>
            <h1 data-testid="page-title">{ getTitle() }</h1>
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
