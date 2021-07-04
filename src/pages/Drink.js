import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { recipeById } from '../services/requests';
import { renderIngredients } from '../utils';

const Drink = ({ match }) => {
  const {
    params: { id },
  } = match;
  const [drink, setDrink] = useState({});

  useEffect(() => {
    recipeById(id).then(setDrink);
  }, [id, setDrink]);

  console.log(drink);
  return (
    <div>
      <h2 data-testid="recipe-title">{drink.strDrink}</h2>
      <h3 data-testid="recipe-category">{drink.strAlcoholic}</h3>
      <img
        data-testid="recipe-photo"
        src={ drink.strDrinkThumb }
        alt={ drink.strDrink }
      />
      <ul>
        Ingredientes:
        {renderIngredients(drink)}
      </ul>
      <p data-testid="instructions">{drink.strInstructions}</p>
      <p data-testid="0-recomendation-card">recomendation</p>
      <button type="button" data-testid="share-btn">
        Compartilhar
      </button>
      <button type="button" data-testid="favorite-btn">
        Favoritar
      </button>
      <button type="button" data-testid="start-recipe-btn">
        Iniciar Receita
      </button>
    </div>
  );
};

Drink.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Drink;
