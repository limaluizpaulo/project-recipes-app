import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import store, { addRecDetail, setLoading } from '../../context/store';
import { getStorage, setStorage } from '../../functions';
import { fetchAPI, FETCH_ID_D, FETCH_ID_M } from '../../services';
import ShareLikeButton from './ShareLikeButton';

export default function RecipeInProgress() {
  const { id } = useParams();
  // const [saveLS, setSaveLS] = useState(false);
  const [ingrOK, setIngrOK] = useState(() => (getStorage('inProgressRecipes')[id] || []));
  const [taskOK, setTaskOK] = useState({});
  const { recipes: { loading, recipeDetail, foods }, setRecipes } = useContext(store);

  console.log(ingrOK);

  const addTaskCompleted = ({ target: { checked, name } }) => {
    const setTaskCompleted = { ...taskOK, [name]: checked };
    console.log(setTaskCompleted);
    setTaskOK(setTaskCompleted);

    const ingredientsOK = Object.keys(setTaskCompleted)
      .filter((ingredient) => {
        if (setTaskCompleted[ingredient]) {
          return ingredient;
        }
        return '';
      });
    setIngrOK(ingredientsOK);
    setStorage('inProgressRecipes', {
      [recipeDetail.idMeal || recipeDetail.idDrink]: ingredientsOK });
  };

  const renderIngredients = () => {
    const ingredients = Object.keys(recipeDetail)
      .filter((item) => item.includes('strIngredient'))
      .map((ingredient) => recipeDetail[ingredient])
      .filter((ingredient) => ingredient);

    const measures = Object.keys(recipeDetail)
      .filter((item) => item.includes('strMeasure'))
      .map((measure) => recipeDetail[measure])
      .filter((measure) => measure);

    return (
      ingredients.map((ingredient, i) => {
        const task = `${ingredient}: ${measures[i]}`;
        return (
          <div key={ i }>
            <label
              htmlFor={ ingredient }
              className={ (taskOK[task]) ? 'completedRecipe' : '' }
            >
              <input
                type="checkbox"
                data-testid={ `${i + 1}-ingredient-step` }
                name={ task }
                id={ ingredient }
                onClick={ addTaskCompleted }
              />
              {task}
            </label>
          </div>
        );
      })
    );
  };

  function renderRecipe() {
    return (
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
            <ShareLikeButton />
          </div>
          <h5 data-testid="recipe-category">
            Categoria:
            { recipeDetail.strCategory }
          </h5>
        </div>
        <div>
          <h4>Ingredientes</h4>
          {renderIngredients()}
        </div>
        <div>
          <h4>Instruções</h4>
          <p data-testid="instructions">{ recipeDetail.strInstructions }</p>
        </div>
        <button
          data-testid="finish-recipe-btn"
          type="button"
        >
          Finalizar Receita
        </button>
      </div>
    );
  }

  const getRecipeDetailByID = async () => {
    if (foods) {
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

  useEffect(() => {
    if (loading) getRecipeDetailByID();
  });

  // ---------------------------------------------------------------------------------------------

  if (loading) return (<h5>Loading...</h5>);
  return (
    renderRecipe()
  );
}
