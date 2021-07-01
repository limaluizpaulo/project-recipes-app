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

  function imageRendering() {
    switch (path) {
    case '/comidas':
    case '/bebidas':
    case '/explorar/comidas/area':
      return (
        <Navbar bg="dark" variant="dark">
          <Container>
            <Nav.Link href="/perfil">
              <img data-testid="profile-top-btn" src={ profileIcon } alt="" />
            </Nav.Link>
            <Navbar.Brand href="/">
              <h1 data-testid="page-title">Page Title</h1>
            </Navbar.Brand>
            <button
              data-testid="search-top-btn"
              type="button"
              onClick={ () => setHidden(!(isHidden)) }
            >
              <img src={ searchIcon } alt="" />
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
        <>
          <img data-testid="profile-top-btn" src={ profileIcon } alt="" />
          <h1 data-testid="page-title">Page Title</h1>
        </>);
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
