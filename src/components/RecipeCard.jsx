import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipeContext from '../context';
// import useFetchRecipesApi from '../utils/useFetchRecipesApi';

function RecipeCard({ recipe: { id, name, image }, index }) {
  const { pathname } = useLocation();
  const path = pathname.includes('comidas') ? '/comidas' : '/bebidas';
  // const history = useHistory();
  // const { strMealThumb, strMeal, idMeal } = recipe;
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
      to={ `${path}/${id}` }
      onClick={ () => setIdDetail(id) }
    >
      <div data-testid={ `${index}-recipe-card` }>
        <img src={ image } alt={ name } data-testid={ `${index}-card-img` } />
        <p data-testid={ `${index}-card-name` }>{name}</p>
      </div>
    </Link>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ])).isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipeCard;
