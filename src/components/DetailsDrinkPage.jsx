import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import ContextRecipes from '../context/contextRecipes';

function DetailsDrinkPage({ match: { params } }) {
  const { drinks, setDrinks } = useContext(ContextRecipes);
  const { id } = params;
  useEffect(() => {
    const getRecipes = () => {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json()).then((results) => setDrinks(results.drinks));
    };
    getRecipes();
  }, [setDrinks, id]);
  console.log(id, drinks);

  return (
    <div>
      <span>Hello</span>
      <p>{ drinks[0] && drinks[0].strDrink}</p>
    </div>
  );
}

DetailsDrinkPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
}.isRequired;

export default DetailsDrinkPage;
