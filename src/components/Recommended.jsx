import React, { useContext } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import DrinksContext from '../context/DrinksContext';
import RecipesContext from '../context/RecipesContext';

export default function Recommended() {
  const { allDrinks: { drinks } } = useContext(DrinksContext);
  const { allRecipes: { recipes } } = useContext(RecipesContext);

  const { pathname } = useLocation();

  const NUMBER_TO_VERIFICATION = -1;
  const NUMBER_OF_ITEMS = 6;
  const getDrinksDetails = pathname.indexOf('bebidas') > NUMBER_TO_VERIFICATION;

  return getDrinksDetails ? (
    <section>
      <h1>Recomendadas</h1>
      <div>
        {
          recipes.slice(0, NUMBER_OF_ITEMS)
            .map((recipe, index) => (
              <div
                className="card-field"
                data-testid={ `${index}-recipe-card` }
                key={ index }
              >
                <Link to={ `/comidas/${recipe.idMeal}` }>
                  <img
                    data-testid={ `${index}-recomendation-card` }
                    src={ recipe.strMealThumb }
                    alt={ recipe.strMeal }
                  />
                  <span data-testid="recipe-category">{ recipe.strCategory }</span>
                  <h5 data-testid={ `${index}-card-name` }>{recipe.strMeal}</h5>
                </Link>
              </div>
            ))
        }
      </div>
    </section>
  ) : (
    <section>
      <h1>Recomendadas</h1>
      <div>
        {
          drinks.slice(0, NUMBER_OF_ITEMS)
            .map((drink, index) => (
              <div
                className="card-field"
                data-testid={ `${index}-recipe-card` }
                key={ index }
              >
                <Link to={ `/bebidas/${drink.idDrink}` }>
                  <img
                    data-testid={ `${index}-recomendation-card` }
                    src={ drink.strDrinkThumb }
                    alt={ drink.strDrink }
                  />
                  <span data-testid="recipe-category">{ drink.strCategory }</span>
                  <h5 data-testid={ `${index}-card-name` }>{drink.strDrink}</h5>
                </Link>
              </div>
            ))
        }
      </div>
    </section>

  );
}
