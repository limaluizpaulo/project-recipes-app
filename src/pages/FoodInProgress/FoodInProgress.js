import React, { useState, useEffect } from 'react';
import { requestFoodById } from '../../helpers/requests';
import ButtonShare from '../../components/ButtonShare/ButtonShare';
import ButtonFavorite from '../../components/ButtonFavorite/ButtonFavorite';

function FoodInProgress({ match }) {
  const { url } = match;
  const [data, setData] = useState([]);
  const [food, setFood] = useState({});
  const { params: { id } } = match;

  useEffect(() => {
    (async function request() {
      const resolve = await requestFoodById(id);
      setData(resolve);
    }());
    const getStorage = localStorage.getItem('meals');
    if (!getStorage) localStorage.setItem('meals', JSON.stringify([]));
  }, [id]);

  useEffect(() => {
    if (data.meals) {
      setFood({
        id: data.meals[0].idMeal,
        type: 'comida',
        area: data.meals[0].strArea,
        category: data.meals[0].strCategory,
        alcoholicOrNot: '',
        name: data.meals[0].strMeal,
        image: data.meals[0].strMealThumb,
      });
    }
  }, [data.meals]);

  function ingredients() {
    if (data.meals) {
      const keysIngredients = [];
      Object.keys(data.meals[0]).forEach((key) => {
        if (key.match('strIngredient')) keysIngredients.push(key);
      });
      return keysIngredients;
    }
  }

  function handleChange({ target: { name } }) {
    const getStorage = JSON.parse(localStorage.getItem('meals'));
    localStorage.setItem('meals', JSON.stringify([...getStorage, name]));
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
              { ingredients().map((key, index) => data.meals[0][key] !== ''
              && data.meals[0][key] !== null
              && (
                <li data-testid={ `${index}-ingredient-step` } key={ index }>
                  <label htmlFor={ index }>
                    <input
                      type="checkbox"
                      id={ index }
                      name={ data.meals[0][key] }
                      onClick={ handleChange }
                      checked={ JSON.parse(localStorage.getItem('meals'))
                        .find((item) => item === data.meals[0][key]) }
                    />
                    { data.meals[0][key] }
                    {}
                  </label>
                </li>
              ))}
              <ButtonShare
                path={ `localhost:3000${url}` }
                dataTest="share-btn"
              />
              <ButtonFavorite
                id={ id }
                favoriteRecipes={ food }
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
export default FoodInProgress;
