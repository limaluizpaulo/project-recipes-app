import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import DrinksContext from '../context/DrinksContext';
import RecipesContext from '../context/RecipesContext';

import '../styles/Recommended.css';

export default function Recommended() {
  const { allDrinks: { drinks } } = useContext(DrinksContext);
  const { allRecipes: { recipes } } = useContext(RecipesContext);
  const [visible, setVisible] = useState([0, 1]);

  const { pathname } = useLocation();

  const NUMBER_TO_VERIFICATION = -1;
  const NUMBER_OF_ITEMS = 6;

  const getDrinksDetails = pathname.indexOf('bebidas') > NUMBER_TO_VERIFICATION;

  function next() {
    if (visible[1] === NUMBER_OF_ITEMS - 1) {
      console.log(visible[0]);
      console.log(visible[1]);
      setVisible([NUMBER_OF_ITEMS - 1, 0]);
    } else if (visible[1] === 0) {
      console.log(visible[0]);
      console.log(visible[1]);
      setVisible([1, 2]);
    } else {
      console.log(visible[0]);
      console.log(visible[1]);
      setVisible([visible[0] + 1, visible[1] + 1]);
    }
  }

  function prev() {
    if (visible[0] === 0) {
      console.log(visible[0]);
      console.log(visible[1]);
      setVisible([NUMBER_OF_ITEMS - 1, 0]);
    } else if (visible[1] === 0) {
      console.log(visible[0]);
      console.log(visible[1]);
      setVisible([visible[0] - 1, NUMBER_OF_ITEMS - 1]);
    } else {
      console.log(visible[0]);
      console.log(visible[1]);
      setVisible([visible[0] - 1, visible[1] - 1]);
    }
  }
  return getDrinksDetails ? (
    <section className="recommended">
      <h1>Recomendadas</h1>
      <div className="cards-recommended">
        <button
          type="button"
          onClick={ () => prev() }
        >
          prev
        </button>
        {
          recipes.slice(0, NUMBER_OF_ITEMS)
            .map((recipe, index) => (
              <div
                className={ visible.includes(index) ? 'card' : 'card-hidden' }
                data-testid={ `${index}-recipe-card` }
                key={ index }
              >
                <Link to={ `/comidas/${recipe.idMeal}` }>
                  <img
                    data-testid={ `${index}-recomendation-card` }
                    src={ recipe.strMealThumb }
                    alt={ recipe.strMeal }
                  />
                  <span
                    data-testid={ `${index}-recomendation-title` }
                  >
                    {recipe.strMeal}
                  </span>
                  <span data-testid="recipe-category">{ recipe.strCategory }</span>
                </Link>
              </div>
            ))
        }
        <button
          type="button"
          onClick={ () => next() }
        >
          next
        </button>
      </div>
    </section>
  ) : (
    <section className="recommended">
      <h1>Recomendadas</h1>
      <div className="cards-recommended">
        <button
          type="button"
          onClick={ () => prev() }
        >
          prev
        </button>
        {
          drinks.slice(0, NUMBER_OF_ITEMS)
            .map((drink, index) => (
              <div
                className={ visible.includes(index) ? 'card' : 'card-hidden' }
                data-testid={ `${index}-recipe-card` }
                key={ index }
              >
                <Link to={ `/bebidas/${drink.idDrink}` }>
                  <img
                    data-testid={ `${index}-recomendation-card` }
                    src={ drink.strDrinkThumb }
                    alt={ drink.strDrink }
                  />
                  <span
                    data-testid={ `${index}-recomendation-title` }
                  >
                    {drink.strDrink}
                  </span>
                  <span data-testid="recipe-category">{ drink.strCategory }</span>
                </Link>
              </div>
            ))
        }
        <button
          type="button"
          onClick={ () => prev() }
        >
          prev
        </button>
      </div>
    </section>

  );
}
