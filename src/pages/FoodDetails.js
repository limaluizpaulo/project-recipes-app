import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';

import { requestByDetailsMeal } from '../services/api';

function FoodDetails() {
  const params = useParams();
  const [item, setItem] = useState([]);

  useEffect(() => {
    const request = async () => {
      const result = await requestByDetailsMeal(params.id);
      setItem(result.meals);
    };
    request();
  }, []);

  return (
    item && (
      item.map((
        { strMeal, strInstructions, strYoutube, strMeasure,
          strMealThumb, strCategory, strIngredient, strSource },
        index,
      ) => (
        <div key={ index }>
          <img src={ strMealThumb } alt={ strMeal } data-testid="recipe-photo" />
          <h1 data-testid="recipe-title">{ strMeal }</h1>
          <img src="" alt="" data-testid="share-btn" />
          {' '}
          Compartilhar
          <img src="" alt="" data-testid="favorite-btn" />
          {' '}
          FAVORITAR
          <span data-testid="recipe-category">{ strCategory }</span>
          <ul>
            <li data-testid={ `${index}ingredient-name-and-measure` }>
              { `${strMeasure}${index}  ${strIngredient}${index}` }
            </li>
          </ul>
          <span data-testid="instructions">{ strInstructions }</span>
          <ReactPlayer url={ strYoutube } data-testid="video" />
          <div data-testid={ `${index}-recomendation-card` }>{ strSource }</div>
          <button type="button" data-testid="start-recipe-btn">
            Iniciar
          </button>
        </div>
      )))
  );
}

export default FoodDetails;
