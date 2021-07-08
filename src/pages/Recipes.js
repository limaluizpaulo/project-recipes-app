import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import RecipesContext from '../context/RecipesContext';
import FoodCard from '../components/FoodCard';

function Recipes({ type }) {
  const { recipes } = useContext(RecipesContext);
  const idRecipeType = type === 'comidas' ? 'idMeal' : 'idDrink';
  const cardMaximun = 12;
  const lengthRecipes = recipes ? recipes.length : null;
  const alertMsg = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';
  // console.log(idRecipeType);
  return (
    <div>
      { lengthRecipes === null
      && global.alert(alertMsg) }
      { lengthRecipes === 1
      && <Redirect to={ `/${type}/${recipes[0][idRecipeType]}` } /> }
      {
        recipes
          && recipes.map((recipe, i) => (
            i < cardMaximun
             && <FoodCard key={ i } order={ i } recipes={ recipe } type={ type } />
          ))
      }
    </div>
  );
}

Recipes.propTypes = {
  type: PropTypes.string.isRequired,
};
export default Recipes;
