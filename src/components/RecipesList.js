import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import DrinksContext from '../context/drinks.context';
import MealsContext from '../context/meals.context';
import { setConstants } from '../helpers';
import './RecipesList.css';

function RecipesList() {
  const MAX_CARDS = 12;
  const { drinks } = useContext(DrinksContext);
  const { meals } = useContext(MealsContext);
  const { location: { pathname }, push } = useHistory();

  const isDrinks = pathname.includes('bebidas');
  const { idKey, imgKey, nameKey, typePt } = setConstants(isDrinks);
  const recipes = isDrinks ? [...drinks] : [...meals];

  return (
    <section className="card-list">
      {recipes.map((item, index) => {
        if (index < MAX_CARDS) {
          return (
            <button
              type="button"
              className="card"
              key={ index }
              onClick={ () => push(`/${typePt}/${item[idKey]}`) }
            >
              <img
                className="card-image"
                src={ item[imgKey] }
                alt={ item[nameKey] }
              />
              <span>{item[nameKey]}</span>
            </button>
          );
        }
        return null;
      })}
    </section>
  );
}

export default RecipesList;
