import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from '../context';
import useFetchRecipesApi from '../utils/useFetchRecipesApi';
import RecipesDrinksCard from './RecipesDrinksCard';

export default function RecipesDrinksList({ url }) {
  const { recipes, searchIngredient } = useContext(RecipeContext);
  const [setRecipeUrl] = useFetchRecipesApi();
  const SEARCH_DRINK_BY_INGREDIENT = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';

  useEffect(() => {
    if (searchIngredient) {
      setRecipeUrl(`${SEARCH_DRINK_BY_INGREDIENT}${searchIngredient}`);
      // setSearchIngredient('');
    } else {
      setRecipeUrl(url);
    }
    // console.log(recipes);
  }, [recipes]);

  return (
    <div>
      {recipes && recipes.map((recipe, index) => (
        <RecipesDrinksCard
          key={ index }
          index={ index }
          recipe={ recipe }
        />
      ))}
    </div>
  );
}

RecipesDrinksList.propTypes = {
  url: PropTypes.string.isRequired,
};
