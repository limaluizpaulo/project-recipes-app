import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useHistory } from 'react-router';
import { fetchRecipeById } from '../services/RecipesServices';

import '../styles/Checked.css';
import {
  PageDetails,
  Ingredients,
  Instructions,
} from '../styles/Details';

import { BtnEndRecipe } from '../styles/InProgress';
import FoodDetailsHeader from '../components/FoodDetailsHeader';

function FoodProgress() {
  const { id } = useParams();
  const history = useHistory();

  const [recipe, setRecipe] = useState({});
  const [disable, setDisable] = useState(true);
  const [countCheck, setCountCheck] = useState(1);
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    fetchRecipeById(id).then(setRecipe);
    function checkedFunction() {
      const localProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (localProgress && localProgress.meals && localProgress.meals[id]) {
        setProgress([...localProgress.meals[id]]);
      }
    }
    checkedFunction();
  }, [id, setRecipe]);

  useEffect(() => {
    const currentProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));

    let ingredientList = {};

    if (currentProgress) {
      ingredientList = {
        ...currentProgress,
        meals: {
          ...currentProgress.meals,
          [id]: progress,
        },
      };
    } else {
      ingredientList = {
        ...currentProgress,
        meals: {
          [id]: progress,
        },
      };
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(ingredientList));
  }, [id, progress]);

  const checkInProgress = useCallback(() => {
    const ingredients = document.querySelectorAll('input');
    console.log(ingredients);
    const ingredientsArr = [...ingredients];
    const listItens = document.querySelectorAll('li');
    console.log(listItens);
    const listItensArr = [...listItens];

    ingredientsArr.forEach((ingredient) => {
      listItensArr.forEach((item, index) => {
        if (ingredient.checked[index]) {
          item.className = 'checked';
        }
      });
    });
  }, []);

  useEffect(() => {
    checkInProgress();
  });

  function buttonChecked() {
    const ingredients = document.querySelectorAll('input');

    let progressChecked = [];

    if (ingredients.length > 0) {
      ingredients.forEach((ingredient, index) => {
        if (ingredient.checked) {
          progressChecked = [...progressChecked, index];
        }
      });
    }

    setProgress([...progressChecked]);
  }

  const handleChecked = useCallback(({ target }) => {
    const li = target.parentNode;
    setCountCheck(countCheck + 1);
    if (target.checked === true) {
      li.className = 'checked';
    }
    if (target.checked === false) li.className = '';
    buttonChecked();
  }, [countCheck]);

  const filterObj = (text, option) => Object.entries(option)
    .filter(([key, value]) => key.match(text) && value);

  const renderCheckBox = useCallback((option) => {
    const ingredients = filterObj(/Ingredient/, option);
    return ingredients.map(([key, ingredient], index) => (
      <li key={ `${key}` } data-testid={ `${index}-ingredient-step` }>
        <input
          className="mr-2"
          id={ `checkbox ${index}` }
          type="checkbox"
          checked={ progress.includes(index) }
          onChange={ handleChecked }
        />
        {ingredient}
      </li>
    ));
  }, [handleChecked, progress]);

  useEffect(() => {
    renderCheckBox(recipe);
    const checked = document.querySelectorAll('.checked');
    const inputs = document.querySelectorAll('input');
    const enable = checked.length === inputs.length;
    if (!enable) {
      setDisable(true);
    } else if (enable) {
      setDisable(false);
    }
  }, [renderCheckBox, recipe, countCheck]);

  function doneRecipe() {
    const date = new Date();
    const storage = JSON.parse(localStorage.getItem('doneRecipes'));
    if (storage && storage.find((done) => done.id === id)) {
      return;
    }
    let doneRecipes = [];
    const done = {
      id,
      type: 'comida',
      area: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
      doneDate: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
      tags: recipe.strTags.split(','),
    };

    if (storage) {
      doneRecipes = [
        ...storage,
        done,
      ];
    } else {
      doneRecipes = [done];
    }
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    history.push('/receitas-feitas');
  }

  return (
    <PageDetails>
      <FoodDetailsHeader recipe={ recipe } id={ id } />
      <main>
        <Ingredients>
          <h1>Ingredientes</h1>
          <div>
            <ul>
              {renderCheckBox(recipe)}
            </ul>
          </div>
        </Ingredients>
        <Instructions>
          <h1>Instruções</h1>
          <div>
            <p data-testid="instructions">{recipe.strInstructions}</p>
          </div>
        </Instructions>
      </main>

      <div style={ { margin: '10px 0' } }>
        <BtnEndRecipe
          data-testid="finish-recipe-btn"
          type="button"
          disabled={ disable }
          onClick={ doneRecipe }
        >
          Finalizar Receita
        </BtnEndRecipe>
      </div>
    </PageDetails>
  );
}

export default FoodProgress;
