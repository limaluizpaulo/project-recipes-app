import React from 'react';
import { Link } from 'react-router-dom';

import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Explorar(props) {
  const { history: { location: { pathname } } } = props;
  const headerNFooter = (
    <>
      <Header />
      <Footer />
    </>);
  switch (pathname) {
  case '/explorar':
    return (
      <>
        { headerNFooter }
        <Link to="/explorar/comidas">
          <button type="button" data-testid="explore-food">Explorar Comidas</button>
        </Link>
        <Link to="/explorar/bebidas">
          <button type="button" data-testid="explore-drinks">Explorar Bebidas</button>
        </Link>
      </>
    );
  case '/explorar/bebidas':
  case '/explorar/comidas':
    return (
      <>
        { headerNFooter }
        <Link to={ `${pathname}/ingrediente` }>
          <button
            type="button"
            data-testid="explore-by-ingredient"
          >
            Por Ingredientes
          </button>
        </Link>
        { pathname === '/explorar/comidas' && (
          <Link to="/explorar/comidas/ingrediente">
            <button
              type="button"
              data-testid="explore-by-area"
            >
              Por Local de Origem
            </button>
          </Link>
        )}
        <Link to="/explorar/comidas/ingrediente">
          <button
            type="button"
            data-testid="explore-surprise"
          >
            Me Surpreenda!
          </button>
        </Link>
      </>
    );

  default:
    break;
  }
}
