import React, { useContext, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipeContext from '../context';
import useFetchRecipesApi from '../utils/useFetchRecipesApi';

function RecipesDrinksCard({ recipe, index }) {
  const { strDrinkThumb, strDrink, idDrink } = recipe;
  const [setRecipeUrl] = useFetchRecipesApi();
  const BASE_URL_DETAIL_DRINK = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`;
  const { setIdDetail } = useContext(RecipeContext);

  // useEffect(() => {
  //   const func = () => {};
  //   func();
  //   return () => {
  //     console.log('unmount' + BASE_URL_DETAIL_DRINK);
  //     setRecipeUrl(BASE_URL_DETAIL_DRINK);
  //   };
  // }, []);

  // function handleClick(id) {
  //   setIdDetail(id);
  //   console.log('click ## ' + id);
  //   // alert('hello');
  //   // window.location = `/bebidas/${id}`;
  // }
  return (
    <Link
      to={ `/bebidas/${idDrink}` }
      onClick={ () => setIdDetail(idDrink) }
    >
      <div data-testid={ `${index}-recipe-card` }>
        <img src={ strDrinkThumb } alt={ strDrink } data-testid={ `${index}-card-img` } />
        <p data-testid={ `${index}-card-name` }>{strDrink}</p>
      </div>
    </Link>
  );
}

export default RecipesDrinksCard;

RecipesDrinksCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ])).isRequired,
  index: PropTypes.number.isRequired,
};
