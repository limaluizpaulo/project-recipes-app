import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import copy from 'clipboard-copy';
import { getDrinkDetails, getMealDetails } from '../services';
import shareIcon from '../images/shareIcon.svg';
import { FavoriteBtn } from '../components';

function RecipeInProgress({ match, history }) {
  const { id } = match.params;
  const { pathname } = history.location;
  const recipeType = pathname.includes('/comidas') ? 'meals' : 'cocktails';
  const [recipeInProgress, setRecipeInProgress] = useState({});
  const [wasCopied, setWasCopied] = useState(false);

  const setLocalStorage = () => {
    const localStorageDefault = {
      cocktails: {
        [id]: [],
      },
      meals: {
        [id]: [],
      },
    };
    if (!localStorage.getItem('inProgressRecipes')) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(localStorageDefault));
    }
  };

  const checkLocalStorage = (index) => {
    setLocalStorage(); // creates a default when undefined
    const arr = JSON.parse(localStorage.getItem('inProgressRecipes'))[recipeType];
    return arr[id].some((el) => el === index);
  };

  const updateLocalStorage = (item) => {
    const data = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const { cocktails, meals } = data;
    if (recipeType === 'meals') {
      meals[id].push(item);
    }
    if (recipeType === 'cocktails') {
      cocktails[id].push(item);
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      cocktails,
      meals,
    }));
  };

  useEffect(() => {
    const getRecipes = async () => {
      const resp = recipeType === 'meals'
        ? await getMealDetails(id)
        : await getDrinkDetails(id);
      setRecipeInProgress(resp[0]);
    };
    getRecipes();
  }, [id, pathname, recipeType]);

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

  // const strMeasure = Object.entries(recipeInProgress).filter(
  //   (el) => el[0].includes('strMeasure'),
  // );
  // const measures = strMeasure.filter((el) => el[1] !== '' && el[1] !== null);

  const shareRecipe = () => {
    copy(window.location.href.replace('/in-progress', ''));
    setWasCopied(true);
  };

  return (
    <section>
      <h2 data-testid="recipe-title">{strMeal || strDrink}</h2>
      <img
        src={ strMealThumb || strDrinkThumb }
        alt="Imagem ilustrativa do prato "
        data-testid="recipe-photo"
      />

      <button
        type="button"
        data-testid="share-btn"
        onClick={ shareRecipe }
      >
        <img src={ shareIcon } className="small-btn" alt="icone de compartilhar" />
      </button>

      <FavoriteBtn id={ id } type={ recipeType } currentRecipe={ recipeInProgress } />

      <span data-testid="recipe-category">{strCategory}</span>
      {wasCopied && <span>Link copiado!</span>}

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
                onChange={ () => updateLocalStorage(idx) }
                defaultChecked={ checkLocalStorage(idx) }
              />
              {`${recp[1]}`}
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
