import React, { useState, useEffect } from 'react';
import { requestFoodById } from '../../helpers/requests';

function FoodInProgress({ match }) {
  const [data, setData] = useState([]);
  const { params: { id } } = match;
  useEffect(() => {
    (async function request() {
      const resolve = await requestFoodById(id);
      setData(resolve);
    }());
  }, [id]);

  function ingredients() {
    if (data.meals) {
      const keysIngredients = [];
      Object.keys(data.meals[0]).forEach((key) => {
        if (key.match('strIngredient')) keysIngredients.push(key);
      });
      return keysIngredients;
    }
  }
  return (
    <div>
      {
        data.meals
          ? (
            <div>
              <img
                data-testid="recipe-photo"
                src={ data.meals[0].strMealThumb }
                alt={ data.meals[0].strMeal }
              />
              <p data-testid="recipe-title">
                Name:
                {data.meals[0].strMeal}
              </p>
              <p data-testid="recipe-category">
                Category:
                {data.meals[0].strCategory}

              </p>
              <p>
                Ingredients:
              </p>
              { ingredients().map((key, index) => data.meals[0][key] !== '' && data.meals[0][key] !== null && (
                <li data-testid={ `${index}ingredient-step` }>
                  <label key={ index } htmlFor={ index }>
                    { data.meals[0][key] }
                  </label>
                  <input type="checkbox" id={ index } />
                </li>
              )) }
              <button data-testid="share-btn" type="button">Compartilhar</button>
              <button data-testid="favorite-btn" type="button">Favoritar</button>
              <button data-testid="instructions" type="button">Instructions</button>
              <button data-testid="finish-recipe-btn" type="button">Finalizar</button>
            </div>
          )
          : <h1>Carregando...</h1>
      }
    </div>
  );
}
export default FoodInProgress;
