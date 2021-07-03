import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import store, { addRecDetail, setLoading } from '../../context/store';
import { getStorage } from '../../functions';
import { fetchAPI, FETCH_ID_D, FETCH_ID_M } from '../../services';
import LikeButton from '../components/LikeButton';
import RecipeIngredients from '../components/RecipeIngredients';
import ShareButton from '../components/ShareButton';

export default function RecipeInProgress() {
  const { id } = useParams();
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [ingrOK, setIngrOK] = useState(() => (getStorage('inProgressRecipes')[id] || []));
  const { recipes: { loading, recipeDetail, foods }, setRecipes } = useContext(store);

  const validationButton = () => {
    const ingredients = Object.keys(recipeDetail)
      .filter((item) => item.includes('strIngredient'))
      .map((ingredient) => recipeDetail[ingredient])
      .filter((ingredient) => ingredient);

    if (ingredients.length === ingrOK.length) {
      setDisabledBtn(false);
    } else {
      setDisabledBtn(true);
    }
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
        <h4>Ingredientes</h4>
        <RecipeIngredients
          inProg
          setIngrOK={ setIngrOK }
          ingrOK={ ingrOK }
        />
      </div>
      <div>
        <h4>Instruções</h4>
        <p data-testid="instructions">{ recipeDetail.strInstructions }</p>
      </div>
      <Link to="/receitas-feitas">
        <button
          data-testid="finish-recipe-btn"
          type="button"
          disabled={ disabledBtn }
        >
          Finalizar Receita
        </button>
      </Link>
    </div>
  );

  const getRecipeDetailByID = async () => {
    if (foods === null) {
      setRecipes(setLoading(true));
    } else if (foods) {
      const mealsDetails = await fetchAPI(`${FETCH_ID_M}${id}`);
      setRecipes(addRecDetail(mealsDetails.meals[0]));
      setRecipes(setLoading(false));
    } else {
      const drinksDetails = await fetchAPI(`${FETCH_ID_D}${id}`);
      setRecipes(addRecDetail(drinksDetails.drinks[0]));
      setRecipes(setLoading(false));
    }
  };

  // ---------------------------------------------------------------------------------------------
  // CICLOS DE VIDA

  useEffect(() => { if (loading) getRecipeDetailByID(); });
  useEffect(validationButton, [ingrOK, recipeDetail]);

  // ---------------------------------------------------------------------------------------------

  if (loading) return (<h5>Loading...</h5>);
  return (
    renderRecipe()
  );
}
