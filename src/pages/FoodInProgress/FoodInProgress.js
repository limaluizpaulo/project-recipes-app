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
  console.log(data);

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
              <p data-testid="recipe-title">{data.meals[0].strMeal}</p>
              <p data-testid="recipe-category">{data.meals[0].strCategory}</p>
              <button data-testid="share-btn" type="button">Compartilhar</button>
              <button data-testid="favorite-btn" type="button">Favoritar</button>
            </div>
          )
          : <h1>Carregando...</h1>
      }
    </div>
  );
}

export default FoodInProgress;
