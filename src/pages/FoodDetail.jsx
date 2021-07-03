import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function FoodDetails() {
  const { id } = useParams();
  const { recipeDetail, getRecipesById, ingredientsRecipe } = useContext(RecipesContext);

  /*   function getIngredients() {
    const array = [];

    console.log(ingredients);
  } */

  function renderHeader() {
    return (
      <header>
        <img
          src={ recipeDetail.strMealThumb }
          alt={ recipeDetail.strMeal }
          data-testid="recipe-photo"
        />
        <section>
          <div className="Title-and-Category">
            <span data-testid="recipe-title">{ recipeDetail.strMeal}</span>
            <span data-testid="recipe-category">{ recipeDetail.strCategory }</span>
          </div>
          <div className="Like-and-Share">
            <button type="button" data-testid="share-btn">
              <img src={ shareIcon } alt="Icon Share" />
            </button>
            <button type="button" data-testid="favorite-btn">
              <img src={ whiteHeartIcon } alt="Icon Like" />
            </button>
          </div>
        </section>
      </header>
    );
  }
  useEffect(() => {
    getRecipesById(id);
  }, [ingredientsRecipe]);

  return (
    <>
      {renderHeader()}
      <main>
        <section className="Ingredients">
          <h1>Ingredients</h1>
          <div>
            <ul>
              {ingredientsRecipe.map((item, index) => (
                <li
                  key={ item }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="Instructions">
          <h1>Instructions</h1>
          <div>
            <p data-testid="instructions">{recipeDetail.strInstructions}</p>
          </div>
        </section>
      </main>
    </>
  );
}

export default FoodDetails;
