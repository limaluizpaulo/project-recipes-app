import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import store, { addRecDetail, setLoading } from '../../context/store';
import { getStorage, setStorage } from '../../functions';
import { fetchAPI, FETCH_ID_D, FETCH_ID_M } from '../../services';
import RenderRecipe from './RenderRecipe';

export default function RecipeInProgress() {
  const { id } = useParams();
  const [ingrOK, setIngrOK] = useState(() => (getStorage('inProgressRecipes')[id] || []));
  const [taskOK, setTaskOK] = useState({});
  const { recipes: { loading, recipeDetail, foods }, setRecipes } = useContext(store);

  const addTaskCompleted = ({ target: { checked, name } }) => {
    const setTaskCompleted = { ...taskOK, [name]: checked };

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
                checked={ ingrOK.includes(task) }
                onClick={ addTaskCompleted }
              />
              {task}
            </label>
          </div>
        );
      })
    );
  };

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

  useEffect(() => {
    if (loading) getRecipeDetailByID();
  });

  // ---------------------------------------------------------------------------------------------

  if (loading) return (<h5>Loading...</h5>);
  return (
    <RenderRecipe renderIngredients={ renderIngredients } />
  );
}
