import React, { useState, useEffect } from 'react';
import { requestDrinkById } from '../../helpers/requests';

function DrinkInProgress({ match }) {
  const [data, setData] = useState([]);
  const { params: { id } } = match;
  useEffect(() => {
    (async function request() {
      const resolve = await requestDrinkById(id);
      setData(resolve);
    }());
  }, [id]);

  function ingredients() {
    if (data.drinks) {
      const keysIngredients = [];
      Object.keys(data.drinks[0]).forEach((key) => {
        if (key.match('strIngredient')) keysIngredients.push(key);
      });
      return keysIngredients;
    }
  }
  return (
    <div>
      {
        data.drinks
          ? (
            <div>
              <img
                data-testid="recipe-photo"
                src={ data.drinks[0].strDrinkThumb }
                alt={ data.drinks[0].strDrink }
              />
              <p data-testid="recipe-title">
                Name:
                {data.drinks[0].strDrink}
              </p>
              <p data-testid="recipe-category">
                Category:
                {data.drinks[0].strCategory}

              </p>
              <p>
                Ingredients:
              </p>
              { ingredients().map((key, index) => data.drinks[0][key] !== '' && data.drinks[0][key] !== null && (
                <div key={ index }>
                  <label htmlFor={ index }>
                    <input type="checkbox" id={ index } data-testid={ `${index}-ingredient-step` } />
                    { data.drinks[0][key] }
                  </label>
                </div>
              ))}
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
export default DrinkInProgress;
