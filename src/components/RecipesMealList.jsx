import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from '../context';
import useFetchRecipesApi from '../utils/useFetchRecipesApi';
import RecipesMealCard from './RecipesMealCard';

export default function RecipesMealList({ url }) {
  const { recipes, searchIngredient, setSearchIngredient } = useContext(RecipeContext);
  const [setRecipeUrl] = useFetchRecipesApi();
  const SEARCH_MEAL_BY_INGREDIENT = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';

  useEffect(() => {
    if (searchIngredient) {
      setRecipeUrl(`${SEARCH_MEAL_BY_INGREDIENT}${searchIngredient}`);
      // setSearchIngredient('');
    } else {
      setRecipeUrl(url);
    }
    // console.log(recipes);
  }, [recipes]);

  return (
    <div>
      {recipes && recipes.map((recipe, index) => (
        <RecipesMealCard
          key={ index }
          index={ index }
          recipe={ recipe }
        />
      ))}
    </div>
  );
}

RecipesMealList.propTypes = {
  url: PropTypes.string.isRequired,
};
