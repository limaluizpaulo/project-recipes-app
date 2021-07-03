import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import store, { addRecDetail } from '../../context/store';

export default function RecipeCard() {
  const { recipes: { foods, meals, drinks, cardsLimit }, setRecipes } = useContext(store);

  const renderRecipes = () => {
    const newRecipes = (foods) ? meals.slice(0, cardsLimit) : drinks.slice(0, cardsLimit);

    return (
      newRecipes.map((recipe, index) => (
        <Link
          to={ (foods) ? (`/comidas/${recipe.idMeal}`) : (`/bebidas/${recipe.idDrink}`) }
          key={ index }
        >
          <button
            type="button"
            data-testid={ `${index}-recipe-card` }
            className="recipe"
            onClick={ () => setRecipes(addRecDetail(recipe)) }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ recipe.strMealThumb || recipe.strDrinkThumb }
              alt="recipe-img"
              className="recipeImg"
            />
            <h4
              data-testid={ `${index}-card-name` }
              className="recipeTitle"
            >
              {
                recipe.strMeal || recipe.strDrink
              }
            </h4>
          </button>
        </Link>
      ))
    );
  };

  return (
    <div className="recipes">
      {renderRecipes()}
    </div>
  );
}
