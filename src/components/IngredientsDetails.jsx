import React, { useContext } from 'react';
import { useLocation } from 'react-router';
import DrinksContext from '../context/DrinksContext';
import RecipesContext from '../context/RecipesContext';

export default function IngredientsDetails() {
  const { ingredientsDrink } = useContext(DrinksContext);
  const { ingredientsFood } = useContext(RecipesContext);

  const { pathname } = useLocation();

  const NUMBER_TO_VERIFICATION = -1;
  const getDrinksDetails = pathname.indexOf('bebidas') > NUMBER_TO_VERIFICATION;

  return getDrinksDetails ? (
    <section className="Ingredients">
      <h1>Ingredients</h1>
      <div>
        <ul>
          {ingredientsDrink.map((item, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  ) : (
    <section className="Ingredients">
      <h1>Ingredients</h1>
      <div>
        <ul>
          {ingredientsFood.map((item, index) => (
            <li
              key={ `${index}F` }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
