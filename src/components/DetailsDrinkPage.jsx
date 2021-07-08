import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import ContextRecipes from '../context/contextRecipes';

function DetailsDrinkPage(props) {
  const { drinks, setDrinks } = useContext(ContextRecipes);
  const { id } = props.match.params;
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
  props: PropTypes.objectOf(PropTypes.objectOf()).isRequired,
};

export default DetailsDrinkPage;
