import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function ExplorarReceitas() {
  const RANDOM_MEAL = 'https://www.themealdb.com/api/json/v1/1/random.php';
  const RANDOM_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const [rngMeal, setRngMeal] = useState();
  const [rngDrink, setRngDrink] = useState();
  const history = useHistory();
  const { push } = history;
  const path = history.location.pathname;
  const comidas = '/explorar/comidas';

  function handleRedirect({ target }) {
    const page = target.name;
    return push(`${path}/${page}`);
  }

  function handlefetch(endpoint) {
    return fetch(`${endpoint}`)
      .then((res) => res.json());
  }

  useEffect(() => {
    if (path === comidas) {
      handlefetch(RANDOM_MEAL)
        .then((res) => res.meals)
        .then((res) => setRngMeal(res));
    } else {
      handlefetch(RANDOM_DRINK)
        .then((res) => res.drinks)
        .then((res) => setRngDrink(res));
    }
  }, [path]);

  function surprise() {
    if (path === comidas) {
      return push(`/comidas/${rngMeal[0].idMeal}`);
    }
    return push(`/bebidas/${rngDrink[0].idDrink}`);
  }

  function buttons() {
    if (path === comidas) {
      return (
        <>
          <Button
            name="ingredientes"
            type="button"
            data-testid="explore-by-ingredient"
            onClick={ (e) => handleRedirect(e) }
          >
            Por Ingredientes
          </Button>
          <Button
            name="area"
            type="button"
            data-testid="explore-by-area"
            onClick={ (e) => handleRedirect(e) }
          >
            Por Local de Origem
          </Button>
          <Button
            name="surpresa"
            type="button"
            data-testid="explore-surprise"
            onClick={ surprise }
          >
            Me Surpreenda!
          </Button>
        </>
      );
    }
    return (
      <>
        <Button
          name="ingredientes"
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ (e) => handleRedirect(e) }
        >
          Por Ingredientes
        </Button>
        <Button
          name="surpresa"
          type="button"
          data-testid="explore-surprise"
          onClick={ surprise }
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
