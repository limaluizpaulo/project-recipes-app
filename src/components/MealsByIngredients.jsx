import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import fetchFood from '../services/FoodAPI';
import fetchDrink from '../services/DrinkAPI';

export default function MealsByIngredients() {
  const MEALS_INGREDIENTS = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  const COCKTAIL_INGREDIENTS = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  const history = useHistory();
  const path = history.location.pathname;
  const [ingredients, setIngredients] = useState(null);

  useEffect(() => {
    if (path === '/explorar/comidas/ingredientes') {
      fetchFood(MEALS_INGREDIENTS)
        .then((res) => setIngredients(res));
      console.log('comidas');
    } else {
      fetchDrink(COCKTAIL_INGREDIENTS)
        .then((res) => setIngredients(res));
      console.log('bebidas');
    }
  }, [path]);

  function renderIngredients() {
    const strIngredient = path === '/explorar/comidas/ingredientes'
      ? 'strIngredient' : 'strIngredient1';
    return (
      <>
        {ingredients.map((el) => (
          <div key={ el[strIngredient] }>
            <h3
              data-testid={ `${el[strIngredient]}-card-name` }
            >
              { el[strIngredient] }
            </h3>
            <img
              data-testid={ `${el[strIngredient]}-card-img` }
              src={ `https://www.themealdb.com/images/ingredients/${el[strIngredient]}-Small.png` }
              alt={ el[strIngredient] }
            />
          </div>
        ))}
      </>
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
