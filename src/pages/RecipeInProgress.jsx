import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDrinkDetails, getMealDetails } from '../services';

function RecipeInProgress({ match, history }) {
  const { id } = match.params;
  const { pathname } = history.location;

  const [recipeInProgress, setRecipeInProgress] = useState({});

  useEffect(() => {
    const getRecipes = async () => {
      const resp = pathname.includes('/comidas')
        ? await getMealDetails(id)
        : await getDrinkDetails(id);
      setRecipeInProgress(resp[0]);
    };
    getRecipes();
  }, [id, pathname]);

  const {
    strMeal,
    strMealThumb,
    strDrink,
    strDrinkThumb,
    strCategory,
    strInstructions,
  } = recipeInProgress;

  const strIngredient = Object.entries(recipeInProgress).filter(
    (el) => el[0].includes('strIngredient'),
  );
  const ingredients = strIngredient.filter((el) => el[1] !== '' && el[1] !== null);

  const strMeasure = Object.entries(recipeInProgress).filter(
    (el) => el[0].includes('strMeasure'),
  );
  const measures = strMeasure.filter((el) => el[1] !== '' && el[1] !== null);

  return (
    <section>
      <h2 data-testid="recipe-title">{strMeal || strDrink}</h2>
      <img
        src={ strMealThumb || strDrinkThumb }
        alt="Imagem ilustrativa do prato "
        data-testid="recipe-photo"
      />
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      <span data-testid="recipe-category">{strCategory}</span>
      <ul>
        {ingredients.map((recp, idx) => (
          <li
            key={ idx }
            data-testid={ `${idx}-ingredient-step` }
          >
            <label htmlFor="ingredient">
              <input
                type="checkbox"
                id="ingredient"
                data-testid={ `${idx}-ingredient-name-and-measure` }
              />
              {`${recp[1]} - ${measures[idx][1]}`}
            </label>

          </li>))}
      </ul>
      <span data-testid="instructions">{strInstructions}</span>
      <button type="button" data-testid="finish-recipe-btn">Finalizar receita</button>

    </section>
  );
}

const mapStateToProps = (state) => ({
  inProgressRecipes: state.recipes.inProgressRecipes,
});

RecipeInProgress.propTypes = {
  inProgressRecipe: PropTypes.objectOf,
}.isRequired;

export default connect(mapStateToProps)(RecipeInProgress);
