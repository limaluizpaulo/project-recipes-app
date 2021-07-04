import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { recipeById } from '../services/requests';

const Food = ({ match }) => {
  const {
    params: { id },
  } = match;
  const [meal, setMeal] = useState({});

  useEffect(() => {
    recipeById(id, true).then(setMeal);
  }, [id, setMeal]);

  return (
    <div>
      <h2 data-testid="recipe-title">{meal.strMeal}</h2>
      <img data-testid="recipe-photo" src={ meal.strMealThumb } alt={ meal.strMeal } />
      <p data-testid="recipe-category">{meal.strCategory}</p>
      <p data-testid="instructions">{meal.strInstructions}</p>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      <button type="button" data-testid="start-recipe-btn">Iniciar Receita</button>
    </div>
  );
};

Food.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Food;
