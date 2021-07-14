import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { requestDrinkById } from '../../helpers/requests';
import ButtonShare from '../../components/ButtonShare/ButtonShare';
import ButtonFavorite from '../../components/ButtonFavorite/ButtonFavorite';

function DrinkInProgress({ match }) {
  const { url } = match;
  const [drinks, setDrinks] = useState({});
  const [data, setData] = useState([]);
  const { params: { id } } = match;
  console.log(match);

  useEffect(() => {
    (async function request() {
      const resolve = await requestDrinkById(id);
      setData(resolve);
    }());
    const getStorage = localStorage.getItem('cocktails');
    if (!getStorage) localStorage.setItem('cocktails', JSON.stringify([]));
  }, [id]);

  useEffect(() => {
    if (data.drinks) {
      setDrinks({
        id: data.drinks[0].idDrink,
        type: 'bebida',
        area: '',
        category: data.drinks[0].strCategory,
        alcoholicOrNot: data.drinks[0].strAlcoholic,
        name: data.drinks[0].strDrink,
        image: data.drinks[0].strDrinkThumb,
      });
    }
  }, [data.drinks]);

  function ingredients() {
    if (data.drinks) {
      const keysIngredients = [];
      Object.keys(data.drinks[0]).forEach((key) => {
        if (key.match('strIngredient')) keysIngredients.push(key);
      });
      return keysIngredients;
    }
  }

  function handleChange({ target: { name } }) {
    const getStorage = JSON.parse(localStorage.getItem('cocktails'));
    localStorage.setItem('cocktails', JSON.stringify([...getStorage, name]));
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
              <ul>
                { ingredients().map((key, index) => data.drinks[0][key] !== ''
                && data.drinks[0][key] !== null
                && (
                  <li data-testid={ `${index}-ingredient-step` } key={ index }>
                    <label htmlFor={ index }>
                      <input
                        type="checkbox"
                        id={ index }
                        name={ data.drinks[0][key] }
                        onClick={ handleChange }
                        checked={ JSON.parse(localStorage.getItem('cocktails'))
                          .find((item) => item === data.drinks[0][key]) }
                      />
                      { data.drinks[0][key] }
                      {}
                    </label>
                  </li>
                ))}
              </ul>
              <ButtonShare
                path={ `localhost:3000${url}` }
                dataTest="share-btn"
              />
              <ButtonFavorite
                id={ id }
                favoriteRecipes={ drinks }
                dataTest="favorite-btn"
              />
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
