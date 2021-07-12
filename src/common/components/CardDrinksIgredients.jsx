import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import store, { addRecipes } from '../../context/store';
import {
  fetchAPI,
  EXPLORER_ING_DRINKS,
  IMG_INGR_DRINKS, INGREDIENT_DRINKS } from '../../services';

export default function CardDrinksIgredients() {
  const history = useHistory();
  const { recipes, setRecipes } = useContext(store);
  const [DataCadsIgredientDrinks, setDataCadsIgredientDrinks] = useState([]);

  useEffect(() => {
    fetchAPI(EXPLORER_ING_DRINKS)
      .then((response) => setDataCadsIgredientDrinks(response.drinks));
  }, []);

  function setMeals(response) {
    const { meals, categoriesMeals, categoriesDrinks } = recipes;
    setRecipes(addRecipes(
      meals, response.drinks, categoriesMeals, categoriesDrinks,
    ));
  }

  function setIgredient(id) {
    fetchAPI(`${INGREDIENT_DRINKS}${id}`)
      .then((response) => setMeals(response));
  }

  const handleClick = ({ target: { id } }) => {
    setIgredient(id);
    history.push('/bebidas');
  };
  return (
    DataCadsIgredientDrinks
      ? (
        <div>
          {DataCadsIgredientDrinks.slice(0, '12').map(({ strIngredient1 }, index) => (

            <div
              data-testid={ `${index}-ingredient-card` }
              key={ strIngredient1 }
              id={ strIngredient1 }
              onClick={ handleClick }
              onKeyDown={ handleClick }
              role="button"
              tabIndex={ index }
            >
              <div
                className="imgContainer"
              >
                <img
                  src={ `${IMG_INGR_DRINKS}${strIngredient1}-Small.png` }
                  alt={ strIngredient1 }
                  id={ strIngredient1 }
                  data-testid={ `${index}-card-img` }
                  width="150px"
                />
                <span
                  data-testid={ `${index}-card-name` }
                  id={ strIngredient1 }
                >
                  {strIngredient1}

                </span>
              </div>
            </div>

          ))}
        </div>) : <h5>Loading...</h5>
  );
}
