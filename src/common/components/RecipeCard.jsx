import React, { useContext } from 'react';
import store from '../../context/store';

export default function RecipeCard() {
  const { recipes: { foods, meals, drinks, cardsLimit } } = useContext(store);

  const renderRecipes = () => {
    const newRecipes = (foods) ? meals.slice(0, cardsLimit) : drinks.slice(0, cardsLimit);

    return (
      newRecipes.map((recipe, index) => (
        <div
          key={ index }
          data-testid={ `${index}-recipe-card` }
          className="recipe"
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ recipe.strMealThumb || recipe.strDrinkThumb }
            alt="recipe-img"
            className="recipeImg"
          />
          <div className="recipeData">
            <h4
              data-testid={ `${index}-card-name` }
              className="recipeTitle"
            >
              {
                recipe.strMeal || recipe.strDrink
              }
            </h4>
          </div>
        </div>
      ))
    );
  };

  return (
    <div className="recipes">
      {renderRecipes()}
    </div>
  );
}
