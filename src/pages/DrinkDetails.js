import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import List from '../components/List';

import { requestByDetailsDrink } from '../services/api';

function DrinkDetails() {
  const params = useParams();
  const [drink, setDrink] = useState([]);

  useEffect(() => {
    const request = async () => {
      const result = await requestByDetailsDrink(params.id);
      setDrink(result.drinks);
    };
    request();
  }, []);

  return (
    drink && (
      drink.map((
        { strDrink, strInstructions,
          strDrinkThumb, strAlcoholic, strSource, ...rest },
        index,
      ) => {
        const drinks = rest;
        return (
          <div key={ index }>
            <img src={ strDrinkThumb } alt={ strDrink } data-testid="recipe-photo" />
            <section>
              <div>
                <h1 data-testid="recipe-title">{ strDrink }</h1>
                <span data-testid="recipe-category">{strAlcoholic}</span>
              </div>
              <div>
                <img src="" alt="" data-testid="share-btn" />
                {' '}
                Compartilhar
                <img src="" alt="" data-testid="favorite-btn" />
                {' '}
                FAVORITAR
              </div>
            </section>
            <List drinks={ drinks } />
            <h2>Instructions</h2>
            <span data-testid="instructions">{ strInstructions }</span>
            <h2>Recomendations</h2>
            {/* Recomendações com data-testid={ `${index}-recomendation-card` } */}
            <div data-testid="0-recomendation-card">{ strSource }</div>
            <button type="button" data-testid="start-recipe-btn">
              Start Recipe
            </button>
          </div>
        );
      }))
  );
}

export default DrinkDetails;
