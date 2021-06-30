import React from 'react';
import { // useParams,
  useRouteMatch,
} from 'react-router-dom';

import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header() {
  const { path } = useRouteMatch();
  // Source: https://stackoverflow.com/questions/26574388/boolean-logic-in-switch-case-statement-java/26574416
  function imageRendering() {
    switch (path) {
    case '/explorar':
    case '/comidas':
      return (
        <>
          <img data-testid="profile-top-btn" src={ profileIcon } alt="" />
          <h1 data-testid="page-title">Page Title</h1>
          <img data-testid="search-top-btn" src={ searchIcon } alt="" />
        </>);
    case '/explorar/comidas':
    case '/explorar/comidas/area':
    case '/explorar/comidas/ingredientes':
    case '/explorar/bebidas/ingredientes':
    case '/explorar/bebidas':
    case '/perfil':
      return (
        <>
          <img data-testid="profile-top-btn" src={ profileIcon } alt="" />
          <h1 data-testid="page-title">Page Title</h1>
        </>);
    default:
      return (
        <h1 data-testid="page-title">
          `
          0.0
          `
        </h1>);
    }
  }

  return (
    <header>
      {imageRendering()}
    </header>
  );
}
