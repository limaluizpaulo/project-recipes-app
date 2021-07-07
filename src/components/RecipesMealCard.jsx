import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipeContext from '../context';
// import useFetchRecipesApi from '../utils/useFetchRecipesApi';

function RecipesMealCard({ recipe, index }) {
  // const history = useHistory();
  const { strMealThumb, strMeal, idMeal } = recipe;
  // const [setRecipeUrl] = useFetchRecipesApi();
  // const BASE_URL_DETAIL_MEAL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
  const { setIdDetail } = useContext(RecipeContext);

  // function handleClick(id) {
  //   console.log(BASE_URL_DETAIL_MEAL + ' ###');
  //   setRecipeUrl(BASE_URL_DETAIL_MEAL);
  //   history.push(`/comidas/${id}`);
  // }

  return (
    <Link
      to={ `/comidas/${idMeal}` }
      onClick={ () => setIdDetail(idMeal) }
    >
      <div data-testid={ `${index}-recipe-card` }>
        <img src={ strMealThumb } alt={ strMeal } data-testid={ `${index}-card-img` } />
        <p data-testid={ `${index}-card-name` }>{strMeal}</p>
      </div>
    </Link>
  );
}

export default RecipesMealCard;

RecipesMealCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ])).isRequired,
  index: PropTypes.number.isRequired,
};
