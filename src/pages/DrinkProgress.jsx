import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useHistory } from 'react-router';
import { fetchDrinkById } from '../services/DrinksServices';

import '../styles/Checked.css';
import {
  PageDetails,
  Ingredients,
  Instructions,
} from '../styles/Details';

import { BtnEndRecipe } from '../styles/InProgress';
import DrinkDetailsHeader from '../components/DrinkDetailsHeader';

function DrinkProgress() {
  const { id } = useParams();
  const history = useHistory();

  const [drink, setDrink] = useState({});
  const [disable, setDisable] = useState(true);
  const [countCheck, setCountCheck] = useState(1);
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    fetchDrinkById(id).then((res) => setDrink(res)); function checkedFunction() {
      const localProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (localProgress && localProgress.drinks && localProgress.drinks[id]) {
        setProgress([...localProgress.drinks[id]]);
      }
    }
    checkedFunction();
  }, [id, setDrink]);

  useEffect(() => {
    const currentProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));

    let ingredientList = {};

    if (currentProgress) {
      ingredientList = {
        ...currentProgress,
        drinks: {
          ...currentProgress.drinks,
          [id]: progress,
        },
      };
    } else {
      ingredientList = {
        ...currentProgress,
        drinks: {
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
          id="checkbox"
          type="checkbox"
          checked={ progress.includes(index) }
          onChange={ handleChecked }
        />
        {ingredient}
      </li>
    ));
  }, [handleChecked, progress]);

  useEffect(() => {
    renderCheckBox(drink);
    const checked = document.querySelectorAll('.checked');
    const inputs = document.querySelectorAll('input');
    const enable = checked.length === inputs.length;
    if (!enable) {
      setDisable(true);
    } else if (enable) {
      setDisable(false);
    }
  }, [renderCheckBox, drink, countCheck]);

  function doneDrink() {
    const date = new Date();
    const storage = JSON.parse(localStorage.getItem('doneRecipes'));
    if (storage && storage.find((done) => done.id === id)) {
      return;
    }
    let doneRecipes = [];
    const done = {
      id,
      type: 'bebida',
      area: '',
      category: drink.strCategory,
      alcoholicOrNot: drink.strAlcoholic,
      name: drink.strDrink,
      image: drink.strDrinkThumb,
      doneDate: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
      tags: [],
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
      <DrinkDetailsHeader drink={ drink } id={ id } />
      <main>
        <Ingredients>
          <h1>Ingredientes</h1>
          <div>
            <ul>
              {renderCheckBox(drink)}
            </ul>
          </div>
        </Ingredients>
        <Instructions>
          <h1>Instruções</h1>
          <div>
            <p data-testid="instructions">{drink.strInstructions}</p>
          </div>
        </Instructions>
      </main>

      <div style={ { margin: '10px 0' } }>
        <BtnEndRecipe
          data-testid="finish-recipe-btn"
          type="button"
          disabled={ disable }
          onClick={ doneDrink }
        >
          Finalizar Receita
        </BtnEndRecipe>
      </div>
    </PageDetails>
  );
}

export default DrinkProgress;
