import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { RecipeDetailContext } from '../context';

function RecipesDrinksCard({ recipe, index }) {
  const { strDrinkThumb, strDrink, idDrink } = recipe;
  const { setIdDetail } = useContext(RecipeDetailContext);

  return (
    <Link to={ `/bebidas/${idDrink}` } onClick={ () => setIdDetail(idDrink) }>
      <div data-testid={ `${index}-recipe-card` }>
        <img src={ strDrinkThumb } alt={ strDrink } data-testid={ `${index}-card-img` } />
        <p data-testid={ `${index}-card-name` }>{strDrink}</p>
      </div>
    </Link>
  );
}

export default RecipesDrinksCard;

RecipesDrinksCard.propTypes = {
  recipe: PropTypes.objectOf.isRequired,
  index: PropTypes.number.isRequired,
  strDrinkThumb: PropTypes.string.isRequired,
  strDrink: PropTypes.string.isRequired,
};
