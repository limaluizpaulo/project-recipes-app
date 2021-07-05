import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import fetchFood from '../services/FoodAPI';
import fetchDrink from '../services/DrinkAPI';

export default function MealsByIngredients() {
  const MEALS = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  const COCKTAIL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  const history = useHistory();
  const path = history.location.pathname;
  const [ingredients, setIngredients] = useState([]);
  // const [drink, setDrink] = useState(null);

  useEffect(() => {
    if (path === '/explorar/comidas/ingredientes') {
      fetchFood(MEALS)
      // .then((res) => console.log(res))
        .then((res) => setIngredients(res));
      console.log('comidas');
    } else if (path === '/explorar/bebidas/ingredientes') {
      fetchDrink(COCKTAIL)
      // .then((res) => console.log(res))
        .then((res) => setIngredients(res));
      console.log('bebidas');
    }
  }, [path]);

  if (ingredients === null) {
    return (
      <h2>
        Loading...
      </h2>
    );
  }

  return (
    <div>
      {console.log(ingredients)}
      {ingredients.map((el) => (
        <div key={ el.idIngredient }>
          <h3 data-testid={ `${el.strIngredient}-card-name` }>{ el.strIngredient }</h3>
          <img
            data-testid={ `${el.strIngredient}-card-img` }
            src={ `https://www.themealdb.com/images/ingredients/${el.strIngredient}-Small.png` }
            alt={ el.strIngredient }
          />
        </div>
      ))}
    </div>
  );
}
