import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipeContext from '../context';
import useFetchRecipesApi from '../utils/useFetchRecipesApi';
import RecipeCard from './RecipeCard';

function RecipesList({ url }) {
  const { pathname } = useLocation();
  const { recipes, searchIngredient } = useContext(RecipeContext);
  const [setRecipeUrl] = useFetchRecipesApi();
  const SEARCH_MEAL_BY_INGREDIENT = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
  const SEARCH_DRINK_BY_INGREDIENT = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';

  useEffect(() => {
    if (searchIngredient) {
      setRecipeUrl(`${url.includes('meal') ? SEARCH_MEAL_BY_INGREDIENT
        : SEARCH_DRINK_BY_INGREDIENT}${searchIngredient}`);
      // setSearchIngredient('');
    } else {
      setRecipeUrl(url);
    }
    // console.log(recipes);
  }, [recipes, pathname]);

  function keyTransform(recipe) {
    if (recipe.idMeal) {
      return {
        ...recipe,
        id: recipe.idMeal,
        name: recipe.strMeal,
        image: recipe.strMealThumb,
      };
    }
    return {
      ...recipe,
      id: recipe.idDrink,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
    };
  }

  return (
    <div className="d-flex flex-wrap justify-content-around" style={ { width: '100%', marginBottom: '55px' } }>
      {recipes && recipes.map((recipe, index) => (
        <RecipeCard
          key={ index }
          index={ index }
          recipe={ keyTransform(recipe) }
        />
      ))}
    </div>
  );
}

RecipesList.propTypes = {
  url: PropTypes.string.isRequired,
};

export default RecipesList;
