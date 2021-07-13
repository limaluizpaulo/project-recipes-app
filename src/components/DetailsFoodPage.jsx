import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import ContextRecipes from '../context/contextRecipes';

function DetailsFoodPage({ match: { params } }) {
  const { recipes, setRecipes } = useContext(ContextRecipes);
  const { id } = params;
  useEffect(() => {
    const getRecipes = () => {
    //   if (pathname === '/comidas') {
    //   const endpoint = ;
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json()).then((results) => setRecipes(results.meals));
    //   }
    };
    getRecipes();
  }, [setRecipes, id]);
  // console.log(id, recipes);

  return (
    <div>
      <span>Hello</span>
      <p>{ recipes[0] && recipes[0].strMeal }</p>
    </div>
  );
}

DetailsFoodPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
}.isRequired;

export default DetailsFoodPage;
