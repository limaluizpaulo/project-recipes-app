import React, { useContext } from 'react';
import store from '../../context/store';

export default function RecommendedRecipes() {
  const { recipes: { recommendedRecipes, recommendedLimit } } = useContext(store);

  const renderRecommended = () => {
    const newRecipes = recommendedRecipes.slice(0, recommendedLimit);

    return (
      newRecipes.map((recipe, index) => (
        <div key={ index }>
          <img
            // data-testid={ `${index}-card-img` }
            src={ recipe.strMealThumb || recipe.strDrinkThumb }
            alt="recipe-img"
            className="recommendedImg"
          />
          <h4
            // data-testid={ `${index}-card-name` }
            className="recipeTitle"
          >
            {
              recipe.strMeal || recipe.strDrink
            }
          </h4>
        </div>
      ))
    );
  };

  return (
    renderRecommended()
  );
}
