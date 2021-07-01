import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { RecipeDetailContext } from '../context';

function RecipesMealCard({ recipe, index }) {
  const { strMealThumb, strMeal, idMeal } = recipe;
  const { setIdDetail } = useContext(RecipeDetailContext);

  return (
    <Link to={ `/comidas/${idMeal}` } onClick={ () => setIdDetail(idMeal) }>
      <div data-testid={ `${index}-recipe-card` }>
        <img src={ strMealThumb } alt={ strMeal } data-testid={ `${index}-card-img` } />
        <p data-testid={ `${index}-card-name` }>{strMeal}</p>
      </div>
    </Link>
  );
}

export default RecipesMealCard;

RecipesMealCard.propTypes = {
  recipe: PropTypes.objectOf.isRequired,
  index: PropTypes.number.isRequired,
  strMealThumb: PropTypes.string.isRequired,
  strMeal: PropTypes.string.isRequired,
};
