import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import store, { addRecipesDLoading,
  setDoneLoading, setFetchOnDone } from '../../context/store';
import { getStorage, newDoneRecipe, setStorage } from '../../functions';
import { fetchAPI, FETCH_ID_D, FETCH_ID_M } from '../../services';
import RecipeIngredients from '../components/RecipeIngredients';
import LikeButton from '../components/LikeButton';
import ShareButton from '../components/ShareButton';
import Loading from '../components/Loading';

export default function RecipeInProgress() {
  const { id } = useParams();
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [doneRecipes] = useState(getStorage('doneRecipes'));
  const [ingrLS, setIngrLS] = useState(() => (
    getStorage('inProgressRecipes')[id] || [])); // LS = LocalStorage

  const {
    recipes: { fetchOn, loading, done, recipeDetail, foods },
    setRecipes } = useContext(store);

  const validationButton = () => {
    const ingredients = Object.keys(recipeDetail)
      .filter((item) => item.includes('strIngredient'))
      .map((ingredient) => recipeDetail[ingredient])
      .filter((ingredient) => ingredient);

    if (ingredients.length === ingrLS.length) {
      setDisabledBtn(false);
    } else {
      setDisabledBtn(true);
    }
  };

  const addDoneRecipe = () => {
    const removedInProgress = getStorage('inProgressRecipes');
    delete removedInProgress[id];
    setStorage('inProgressRecipes', removedInProgress);

    const newDoneRecipE = newDoneRecipe(recipeDetail, foods);

    setStorage('doneRecipes', [...doneRecipes, newDoneRecipE]);
  };

  const renderRecipe = () => (
    <div>
      <img
        data-testid="recipe-photo"
        src={ recipeDetail.strMealThumb || recipeDetail.strDrinkThumb }
        alt="recipe-img"
        width="350px"
      />
      <div>
        <div className="titleButtons">
          <h1 data-testid="recipe-title">
            { recipeDetail.strMeal || recipeDetail.strDrink }
          </h1>
          <span className="likeShareBtns">
            <ShareButton />
            <LikeButton recipe={ recipeDetail } />
          </span>
        </div>
        <h5 data-testid="recipe-category">
          Categoria:
          { recipeDetail.strCategory }
        </h5>
      </div>
      <div>
        <h3>Ingredientes</h3>
        <RecipeIngredients
          inProg
          setIngrLS={ setIngrLS }
          ingrLS={ ingrLS }
        />
      </div>
      <div>
        <h3>Instruções</h3>
        <p data-testid="instructions">{ recipeDetail.strInstructions }</p>
      </div>
      <Link to="/receitas-feitas">
        <button
          data-testid="finish-recipe-btn"
          type="button"
          disabled={ disabledBtn }
          onClick={ addDoneRecipe }
          style={ { cursor: 'pointer' } }
        >
          Finalizar Receita
        </button>
      </Link>
    </div>
  );

  const getRecipeDetailByID = async () => {
    const LOADING_TIME = 2500;
    const DONE_TIME = 1500;
    if (foods === null) {
      setRecipes(setFetchOnDone(true));
    } else if (foods) {
      const mealsDetails = await fetchAPI(`${FETCH_ID_M}${id}`);
      setTimeout(() => {
        setRecipes(addRecipesDLoading(mealsDetails.meals[0], true));
        setTimeout(() => {
          setRecipes(setDoneLoading(true));
        }, DONE_TIME);
      }, LOADING_TIME);
      setRecipes(setFetchOnDone(false));
    } else {
      const drinksDetails = await fetchAPI(`${FETCH_ID_D}${id}`);
      setTimeout(() => {
        setRecipes(addRecipesDLoading(drinksDetails.drinks[0]), true);
        setTimeout(() => {
          setRecipes(setDoneLoading(true));
        }, DONE_TIME);
      }, LOADING_TIME);
      setRecipes(setFetchOnDone(false));
    }
  };

  // ---------------------------------------------------------------------------------------------
  // CICLOS DE VIDA

  useEffect(() => { if (fetchOn) getRecipeDetailByID(); });
  useEffect(validationButton, [ingrLS, recipeDetail]);

  // ---------------------------------------------------------------------------------------------

  if (!done) { return (<Loading loading={ loading } />); }
  return (
    renderRecipe()
  );
}
