import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import DrinksContext from '../context/drinks.context';
import MealsContext from '../context/meals.context';

function DrinksList() {
  const MAX_CARDS = 12;
  const { drinks } = useContext(DrinksContext);
  const { meals } = useContext(MealsContext);
  const history = useHistory();
  const { location: { pathname } } = history;

  const isDrinks = pathname.includes('bebidas');
  const recipes = isDrinks ? [...drinks] : [...meals];
  const typePt = isDrinks ? 'bebidas' : 'comidas';
  const idKey = isDrinks ? 'idDrink' : 'idMeal';
  const nameKey = isDrinks ? 'strDrink' : 'strMeal';
  const imgKey = isDrinks ? 'strDrinkThumb' : 'strMealThumb';

  return (
    <div className="card-list">
      {recipes.map((item, index) => {
        if (index < MAX_CARDS) {
          return (
            <button
              type="button"
              className="card"
              key={ index }
              onClick={ () => history.push(`/${typePt}/${item[idKey]}`) }
              data-testid={ `${index}-recipe-card` }
            >
              <img
                className="card-image"
                src={ item[imgKey] }
                alt={ item[nameKey] }
                data-testid={ `${index}-card-img` }
              />
              <span data-testid={ `${index}-card-name` }>{item[nameKey]}</span>
            </button>
          );
        }
        return null;
      })}
    </div>
  );
}

export default DrinksList;
