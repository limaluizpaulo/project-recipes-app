import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { fetchRecipesById } from '../../services/recipesAPI';

function Details({ id, mealsOrDrinks }) {
  const [recipe, setRecipe] = useState({});
  const [recipeKeyword, setRecipeKeyword] = useState('');

  const MAX_DRINKS_INGREDIENTS = 15;
  const MAX_MEALS_INGREDIENTS = 20;

  const [maxIngredients, setMaxIngredients] = useState(MAX_DRINKS_INGREDIENTS);
  const [ingredients, setIngredients] = useState([]);

  const organizeIngredients = () => {
    let tempArray = [];
    for (let number = 1; number <= maxIngredients; number += 1) {
      if (recipe[`strIngredient${number}`]) {
        tempArray = [...tempArray, [
          recipe[`strIngredient${number}`],
          recipe[`strMeasure${number}`],
        ]];
      }
    }
    setIngredients(tempArray);
  };

  const getRecipe = async () => {
    const { [mealsOrDrinks]: [gotRecipe] } = await fetchRecipesById(mealsOrDrinks, id);

    setRecipe(gotRecipe);
  };

  useEffect(() => {
    if (mealsOrDrinks === 'meals') {
      setRecipeKeyword('strMeal');
      setMaxIngredients(MAX_MEALS_INGREDIENTS);
    }
    if (mealsOrDrinks === 'drinks') setRecipeKeyword('strDrink');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    organizeIngredients();
  }, [recipe]);

  useEffect(() => {
    getRecipe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <header>
        {/* TODO: Remove 'style' attribute */}
        <img
          src={ recipe[`${recipeKeyword}Thumb`] }
          alt="test"
          style={ { width: 200 } }
          data-testid="recipe-photo"
        />
        <div>
          <h1 data-testid="recipe-title">{recipe[recipeKeyword]}</h1>
          <div>
            <button type="button" data-testid="share-btn">share</button>
            <button type="button" data-testid="favorite-btn">fav</button>
          </div>
          <h3 data-testid="recipe-category">{recipe.strCategory}</h3>
        </div>
      </header>
      <section>
        <p>Ingredients</p>
        <ul>
          {
            ingredients.map(([ingredient, quantity]) => (
              <li key={ ingredient }>
                {ingredient}
                {', '}
                {quantity}
              </li>
            ))
          }
        </ul>
        <div>
          <h2>Instructions</h2>
          <p>{recipe.strInstructions}</p>
        </div>
        {
          recipe.strYoutube
            ? (
              <div>
                <h2>Video</h2>
                <iframe
                  title={ recipe[recipeKeyword] }
                  src={ recipe.strYoutube.replace('watch?v=', 'embed/') }
                  width="420"
                  height="315"
                  data-testid="video"
                />
              </div>
            )
            : null
        }
        <button type="button" data-testid="start-recipe-btn">Iniciar Receita</button>
      </section>
    </>
  );
}

Details.propTypes = {
  id: PropTypes.string.isRequired,
  mealsOrDrinks: PropTypes.string.isRequired,
};

export default Details;
