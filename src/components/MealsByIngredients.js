import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import RecipesContext from '../context/RecipesContext';
import '../styles/card.css';

export default function MealsByIngredients() {
  const MEALS_INGREDIENTS = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  const COCKTAIL_INGREDIENTS = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  const comidasPath = '/explorar/comidas/ingredientes';
  const history = useHistory();
  const path = history.location.pathname;
  const [ingredients, setIngredients] = useState(null);
  const limitMap = 12;

  const {
    setSearchInput,
  } = useContext(RecipesContext);
  // onClick={ () => { setEndpoint(foodOrDrink.ingredient); } }

  function handleFetch(endpoint) {
    return fetch(`${endpoint}`)
      .then((res) => res.json());
  }

  useEffect(() => {
    if (path === comidasPath) {
      handleFetch(MEALS_INGREDIENTS)
        .then((res) => res.meals)
        .then((res) => setIngredients(res));
    } else {
      handleFetch(COCKTAIL_INGREDIENTS)
        .then((res) => res.drinks)
        .then((res) => setIngredients(res));
    }
  }, [path]);

  function recipesByIngredient({ target }) {
    const { name } = target;
    const { push } = history;
    setSearchInput(name);
    return push('/comidas');
  }

  function renderIngredients() {
    if (path === comidasPath) {
      return (
        <div className="card-container">
          {ingredients.slice(0, limitMap).map((el, i) => (
            <button
              type="button"
              onClick={ (e) => recipesByIngredient(e) }
              className="recipe-card"
              data-testid={ `${i}-ingredient-card` }
              key={ i }
            >
              <h3 data-testid={ `${i}-card-name` }>
                { el.strIngredient }
              </h3>
              <img
                className="card-img"
                data-testid={ `${i}-card-img` }
                src={ `https://www.themealdb.com/images/ingredients/${el.strIngredient}-Small.png` }
                alt={ el.strIngredient }
              />
            </button>
          ))}
        </div>
      );
    }
    return (
      <div className="card-container">
        {ingredients.slice(0, limitMap).map((el, i) => (
          <div
            className="recipe-card"
            data-testid={ `${i}-ingredient-card` }
            key={ i }
          >
            <h3 data-testid={ `${i}-card-name` }>
              { el.strIngredient1 }
            </h3>
            <img
              className="card-img"
              data-testid={ `${i}-card-img` }
              src={ `https://www.thecocktaildb.com/images/ingredients/${el.strIngredient1}-Small.png` }
              alt={ el.strIngredient1 }
            />
          </div>
        ))}
      </div>
    );
  }

  if (ingredients === null) {
    return (
      <h2>
        Loading...
      </h2>
    );
  }

  return (
    <div>
      { renderIngredients() }
    </div>
  );
}
