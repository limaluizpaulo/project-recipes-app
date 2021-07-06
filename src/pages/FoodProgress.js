import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { recipeById } from '../services/requests';
import { renderCheckBox } from '../utils';

const FoodProgress = ({ match }) => {
  const {
    params: { id },
  } = match;
  const [meal, setMeal] = useState({});

  useEffect(() => {
    recipeById(id, true).then(setMeal);
  }, [id, setMeal]);

  console.log(meal);
  return (
    <div>
      <h2 data-testid="recipe-title">{meal.strMeal}</h2>
      <h3 data-testid="recipe-category">{meal.strCategory}</h3>
      <img data-testid="recipe-photo" src={ meal.strMealThumb } alt={ meal.strMeal } />
      <ul>
        Ingredientes:
        {renderCheckBox(meal)}
      </ul>
      <p data-testid="video">Video</p>
      <p data-testid="instructions">{meal.strInstructions}</p>
      <p data-testid="0-recomendation-card">recomendation</p>
      <button type="button" data-testid="share-btn">
        Compartilhar
      </button>
      <button type="button" data-testid="favorite-btn">
        Favoritar
      </button>
      <Link to="/receitas-feitas">
        <button disable type="button" data-testid="finish-recipe-btn">
          Finalizar Receita
        </button>
      </Link>
    </div>
  );
};

FoodProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
export default FoodProgress;
