import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import DrinksContext from '../context/drinks.context';
import MealsContext from '../context/meals.context';
import { getFilteredRecipes, setConstants } from '../helpers';
import { fetchIngredients } from '../services';
import './RecipesList.css';

function IngredientsList() {
  const MAX_CARDS = 12;
  const { setDrinks } = useContext(DrinksContext);
  const { setMeals } = useContext(MealsContext);
  const { location: { pathname }, push } = useHistory();
  const [ingredients, setIngredients] = useState([]);

  const isDrinks = pathname.includes('bebidas');
  const { type, typePt } = setConstants(isDrinks);

  async function handleClick(name) {
    const setFn = isDrinks ? setDrinks : setMeals;
    await getFilteredRecipes({ filter: 'ingredient', searchTerm: name, type, setFn });
    push(`/${typePt}`);
  }

  useEffect(() => {
    async function getIngredients() {
      const result = await fetchIngredients(type);
      if (result) setIngredients(result);
    }
    getIngredients();
  }, [type]);

  return (
    <section className="card-list">
      {ingredients.map((item, index) => {
        if (index < MAX_CARDS) {
          const name = isDrinks
            ? item.strIngredient1
            : item.strIngredient;
          const imgUrl = isDrinks
            ? `https://www.thecocktaildb.com/images/ingredients/${name}-Small.png`
            : `https://www.themealdb.com/images/ingredients/${name}-Small.png`;
          return (
            <button
              type="button"
              className="card"
              key={ index }
              onClick={ () => handleClick(name) }
            >
              <img
                className="card-image"
                src={ imgUrl }
                alt={ name }
              />
              <span>{name}</span>
            </button>
          );
        }
        return null;
      })}
    </section>
  );
}

export default IngredientsList;
