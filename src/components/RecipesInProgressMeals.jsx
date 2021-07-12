import React, { useState, useContext, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

import RecipesContext from '../Context/RecipesContext';
import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';
import { fetchIdMeals } from '../Service/foodApi';

export default function RecipesInProgress() {
  const [disableButton, setDisableButton] = useState(0);
  const [stateChangeHeart, setStateChangeHeart] = useState(true);
  const { stateMeals, setStateMeals, ingredientsMeals, setIngredientsMeals,
    measureMeals, setMeasureMeals } = useContext(RecipesContext);
  const [ingredientMade, setIngreditentMade] = useState([]);

  const { pathname } = useLocation();

  const filterDetails = () => {
    const keysIngredientes = Object.keys(stateMeals[0]);
    const arrayKeysIngredients = keysIngredientes.filter(
      (e) => e.includes('strIngredient'),
    );
    const ingredient = [];
    const measures = [];

    const arrayKeysMeasure = keysIngredientes.filter((e) => e.includes('strMeasure'));
    arrayKeysMeasure.forEach((element) => measures.push(stateMeals[0][element]));
    arrayKeysIngredients.forEach((element) => ingredient.push(stateMeals[0][element]));
    const filtroIngredients = ingredient.filter((word) => word !== '' && word !== null);
    const filtroMeasure = measures.filter((word) => word !== ' ' && word !== null);
    setIngredientsMeals(filtroIngredients);
    setMeasureMeals(filtroMeasure);
  };

  const getApiDetails = () => {
    const id = pathname.split('/')[2];
    fetchIdMeals(id).then((result) => setStateMeals(result));
  };

  useEffect(getApiDetails, []);
  useEffect(filterDetails, [stateMeals]);
  const handleChange = ({ target: { checked, id } }) => {
    if (checked) {
      setDisableButton(disableButton + 1);
      const buttonCheck = document.getElementById(id);
      buttonCheck.classList.add('riscado');
      setIngreditentMade([...ingredientMade, id]);
    } else {
      setDisableButton(disableButton - 1);
      const buttonCheck = document.getElementById(id);
      buttonCheck.classList.remove('riscado');
      const filtered = ingredientMade.filter((e) => e !== id);
      setIngreditentMade(filtered);
    }
  };

  const saveLocalStorage = () => {
    const ingredientSaved = JSON.parse(localStorage
      .getItem('inProgressRecipes') || ('{}'));
    const id = pathname.split('/')[2];

    const save = {
      ...ingredientSaved,
      meals: {
        ...ingredientSaved.meals,
        [id]: ingredientMade,
      },
    };

    localStorage.setItem('inProgressRecipes', JSON.stringify(save));
  };
  const getLocalStorage = () => {
    const id = pathname.split('/')[2];
    const { meals } = JSON.parse(localStorage.getItem('inProgressRecipes') || ('{meals}'));
    if (!(meals && meals[id])) {
      meals[id] = [];
    }
    const numberCheck = meals[id].length;
    const recipesLocalStorage = meals[id];
    setDisableButton(numberCheck);
    setIngreditentMade(recipesLocalStorage);
  };
  useEffect(getLocalStorage, []);
  useEffect(saveLocalStorage, [handleChange]);
  const removeFavorited = () => {
    const id = pathname.split('/')[2];
    const favorited = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorited) {
      const filterLocalStorage = favorited.filter((element) => element.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(filterLocalStorage));
    }
  };

  const verifyHeart = () => {
    const id = pathname.split('/')[2];
    const favorited = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorited) {
      const filterLocalStorage = favorited.some((element) => element.id === id);
      if (filterLocalStorage) {
        setStateChangeHeart(false);
      }
    }
  };

  useEffect(verifyHeart, []);
  useEffect(getApiDetails, []);
  useEffect(filterDetails, [stateMeals]);

  const { idMeal, strArea, strMeal, strMealThumb, strCategory, strInstructions, strTags,
  } = stateMeals[0];

  const recipeDone = () => {
    const data = new Date();
    const day = data.getDate();
    const month = data.getMonth();
    const year = data.getUTCFullYear();
    const doneDate = `${day}-${month}-${year}`;
    const done = JSON.parse(localStorage.getItem('doneRecipes'));
    const recipesDone = {
      id: idMeal,
      type: 'comida',
      area: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
      doneDate,
      tags: [strTags],
    };
    console.log(done);
    if (!done) {
      console.log('if');
      localStorage.setItem('doneRecipes', JSON.stringify([recipesDone]));
    } else {
      console.log('else');
      localStorage.setItem('doneRecipes', JSON.stringify([...done, recipesDone]));
    }
  };

  return (
    <main>
      <img
        src={ strMealThumb }
        alt={ `Imagem ${strMeal}` }
        width="60px"
        data-testid="recipe-photo"
      />
      <h2 data-testid="recipe-title">{strMeal}</h2>
      <ShareButton />
      <FavoriteButton
        stateChangeHeart={ stateChangeHeart }
        setStateChangeHeart={ setStateChangeHeart }
        removeFavorited={ removeFavorited }
      />
      <h3 data-testid="recipe-category">{strCategory}</h3>
      <h2>Ingredients</h2>
      <ul id="ingredients">
        {ingredientsMeals.map((ingredient, index) => (
          <li
            id={ ingredient }
            key={ index }
            className={ ingredientMade.includes(ingredient) ? 'riscado' : 'naoRiscado' }

          >
            {`${ingredient} - `}
            <span data-testid={ `${index}-ingredient-step` }>
              {`${measureMeals[index]}  `}
              <input
                id={ ingredient }
                value={ ingredient }
                type="checkbox"
                onChange={ handleChange }
                checked={ ingredientMade.includes(ingredient) }
              />
            </span>

          </li>
        ))}
      </ul>
      <div>
        <h4>Mode de Preparo</h4>
        <p data-testid="instructions">{strInstructions}</p>
      </div>
      <Link to="/receitas-feitas">
        <button
          type="button"
          data-testid="finish-recipe-btn"
          disabled={ disableButton !== ingredientsMeals.length }
          onClick={ recipeDone }
        >

          Finalizar Receita

        </button>
      </Link>
    </main>
  );
}
