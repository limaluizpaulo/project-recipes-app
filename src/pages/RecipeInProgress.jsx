import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import HeaderDetails from '../components/HeaderDetails';
import { fetchMealById } from '../services/mealsApi';
import { fetchDrinkById } from '../services/drinksApi';
import Ingredients from '../components/Ingredients';

const handleDoneRecipeLocal = (recipe, id) => {
  const doneArr = JSON.parse(localStorage.getItem('doneRecipes'));
  const doneRecipe = {
    id,
    type: recipe.idMeal ? 'comida' : 'bebida',
    area: recipe.strArea || '',
    category: recipe.strCategory || '',
    alcoholicOrNot: recipe.strAlcoholic || '',
    name: recipe.strMeal || recipe.strDrink,
    image: recipe.strMealThumb || recipe.strDrinkThumb,
    doneDate: new Date(),
    tags: recipe.strTags ? recipe.strTags.split(',') : [],
  };

  if (!doneArr) {
    localStorage.setItem('doneRecipes', JSON.stringify([doneRecipe]));
  } else {
    const newDone = [...doneArr, doneRecipe];
    localStorage.setItem('doneRecipes', JSON.stringify(newDone));
  }
};

export default function RecipeInProgress() {
  const [enableBtn, setEnableBtn] = useState(true);
  const [recipe, setRecipe] = useState({});
  const { id } = useParams();
  const { pathname } = useHistory().location;

  useEffect(() => {
    if (pathname.includes('/comidas')) {
      fetchMealById(id).then((data) => setRecipe(...data));
    }
    if (pathname.includes('/bebidas')) {
      fetchDrinkById(id).then((data) => setRecipe(...data));
    }
  }, [id, pathname]);

  // const handleDoneRecipeLocal = () => {
  //   const doneArr = JSON.parse(localStorage.getItem('doneRecipes'));
  //   const doneRecipe = {
  //     id,
  //     type: recipe.idMeal ? 'comida' : 'bebida',
  //     area: recipe.strArea || '',
  //     category: recipe.strCategory || '',
  //     alcoholicOrNot: recipe.strAlcoholic || '',
  //     name: recipe.strMeal || recipe.strDrink,
  //     image: recipe.strMealThumb || recipe.strDrinkThumb,
  //     doneDate: new Date(),
  //     tags: recipe.strTags ? recipe.strTags.split(',') : [],
  //   };

  //   if (!doneArr) {
  //     localStorage.setItem('doneRecipes', JSON.stringify([doneRecipe]));
  //   } else {
  //     const newDone = [...doneArr, doneRecipe];
  //     localStorage.setItem('doneRecipes', JSON.stringify(newDone));
  //   }
  // };

  // if ((Object.keys(recipe).length === 0)) {
  //   return (<ClipLoader
  //     size="120px"
  //     css="margin: 250px 130px"
  //   />);
  // }

  return (
    <div>
      <HeaderDetails recipe={ recipe } pathname={ pathname } />
      {Object.keys(recipe).length ? (
        <main>
          <Ingredients recipe={ recipe } radioBtn setEnableBtn={ setEnableBtn } />
          <div className="instructions-in-progress">
            <h3>Instructions</h3>
            <p data-testid="instructions">{recipe.strInstructions}</p>
          </div>
          <Link to="/receitas-feitas">
            <button
              className="finishi-recipe-btn"
              disabled={ enableBtn }
              type="button"
              data-testid="finish-recipe-btn"
              onClick={ () => handleDoneRecipeLocal(recipe, id) }
            >
              Finalizar Receita
            </button>
          </Link>
        </main>
      ) : (
        <ClipLoader size="120px" css="margin: 150px 130px" />
      )}
    </div>
  );
}
