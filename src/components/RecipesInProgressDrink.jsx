import React, { useState, useContext, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

import RecipesContext from '../Context/RecipesContext';
import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';
import { fetchIdDrink } from '../Service/drinkApi';

export default function RecipesInProgressDrink() {
  const [disableButton, setDisableButton] = useState(0);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [stateChangeHeart, setStateChangeHeart] = useState(true);
  const { stateDrink, setStateDrink } = useContext(RecipesContext);
  const [ingredientMade, setIngreditentMade] = useState([]);
  const { pathname } = useLocation();
  const filterDetails = () => {
    const keysIngredientes = Object.keys(stateDrink[0]);
    const arrayKeysIngredients = keysIngredientes.filter(
      (e) => e.includes('strIngredient'),
    );
    const ingredient = [];
    const measures = [];

    const arrayKeysMeasure = keysIngredientes.filter((e) => e.includes('strMeasure'));
    arrayKeysMeasure.forEach((element) => measures.push(stateDrink[0][element]));
    arrayKeysIngredients.forEach((element) => ingredient.push(stateDrink[0][element]));
    const filtroIngredients = ingredient.filter((word) => word !== '' && word !== null);
    const filtroMeasure = measures.filter((word) => word !== ' ' && word !== null);
    setIngredients(filtroIngredients);
    setMeasure(filtroMeasure);
  };

  const getApiDetails = () => {
    const id = pathname.split('/')[2];
    fetchIdDrink(id).then((result) => setStateDrink(result));
  };

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
    const save = ingredientMade;
    localStorage.setItem('RecipesinProgress', JSON.stringify(save));
  };
  const getLocalStorage = () => {
    const ingredientSaved = JSON.parse(localStorage.getItem('RecipesinProgress'));
    if (ingredientSaved != null) {
      const numberCheck = ingredientSaved.length;
      setDisableButton(numberCheck);
      setIngreditentMade(ingredientSaved);
    }
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
  useEffect(filterDetails, [stateDrink]);

  const { idDrink, strAlcoholic, strDrink, strDrinkThumb,
    strCategory, strInstructions, strTags } = stateDrink[0];
  const recipeDone = () => {
    const data = new Date();
    const day = data.getDate();
    const month = data.getMonth();
    const year = data.getUTCFullYear();
    const doneDate = `${day}-${month}-${year}`;
    const done = JSON.parse(localStorage.getItem('doneRecipes'));
    console.log(strTags);
    const recipesDone = {
      id: idDrink,
      type: 'bebida',
      area: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
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
        src={ strDrinkThumb }
        alt={ `Imagem ${strDrink}` }
        width="60px"
        data-testid="recipe-photo"
      />
      <h2 data-testid="recipe-title">{strDrink}</h2>
      <ShareButton />
      <FavoriteButton
        stateChangeHeart={ stateChangeHeart }
        setStateChangeHeart={ setStateChangeHeart }
        removeFavorited={ removeFavorited }
      />
      <h3 data-testid="recipe-category">{strCategory}</h3>
      <h2>Ingredients</h2>
      <ul id="ingrediesnts">
        {ingredients.map((ingredient, index) => (
          <li
            id={ { ingredient } }
            key={ index }
            value={ index }
            className={ ingredientMade.includes(ingredient) ? 'riscado' : 'naoRiscado' }

          >
            {`${ingredient} - `}
            <span data-testid={ `${index}-ingredient-step` }>
              {`${measure[index] ? measure[index] : ''}  `}
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
          disabled={ disableButton !== ingredients.length }
          onClick={ recipeDone }
        >
          {console.log(disableButton, ingredients.length)}

          Finalizar Receita

        </button>
      </Link>
    </main>
  );
}
