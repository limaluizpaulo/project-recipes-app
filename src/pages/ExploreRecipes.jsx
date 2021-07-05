import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function ExplorarReceitas() {
  const history = useHistory();
  const path = history.location.pathname;

  function handleRedirect({ target }) {
    const page = target.name;
    const { push } = history;
    return push(`${path}/${page}`);
  }

  function buttons() {
    if (path === '/explorar/comidas') {
      return (
        <>
          <Button
            name="ingredientes"
            type="button"
            data-testid="explore-by-ingredient"
            onClick={ (e) => handleRedirect(e) }
          >
            Por Ingrediente
          </Button>
          <Link to={ `${path}/area` }>
            <Button
              name="area"
              type="button"
              data-testid="explore-by-area"
              onClick={ (e) => handleRedirect(e) }
            >
              Por Local de Origem
            </Button>
          </Link>
          <Button
            name="surpresa"
            type="button"
            data-testid="explore-surprise"
            onClick={ (e) => handleRedirect(e) }
          >
            Me Surpreenda!
          </Button>
        </>
      );
    }
    return (
      <>
        <Button
          name="MealsByIngradient"
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ (e) => handleRedirect(e) }
        >
          Por Ingrediente
        </Button>
        <Button
          name="MealsByIngradient"
          type="button"
          data-testid="explore-surprise"
          onClick={ (e) => handleRedirect(e) }
        >
          Me Surpreenda!
        </Button>
      </>

    );
  }
  return (
    <main>
      <Header />
      { buttons() }
      <Footer />
    </main>
  );
}
