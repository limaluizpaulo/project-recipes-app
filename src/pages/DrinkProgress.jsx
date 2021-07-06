import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router';
import copyRecipe from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { fetchDrinkById } from '../services/DrinksServices';
import '../styles/checked.css';

import LoginContext from '../context/LoginContext';

function DrinkProgress() {
  const { id } = useParams();
  const URL = `http://localhost:3000/bebidas/${id}`;
  const history = useHistory();

  const {
    getLocalStorage,
    addLocalStorageDrink,
    removeLocalStorage,
  } = useContext(LoginContext);

  const [drink, setDrink] = useState({});
  const [copy, setCopy] = useState(false);
  const [isFavorite, setISFavorite] = useState(false);
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    fetchDrinkById(id)
      .then((res) => setDrink(res));
  }, [id, setDrink]);

  function copyURL() {
    copyRecipe(URL);
    setCopy(true);
  }

  function setLS() {
    addLocalStorageDrink(id, drink);
    setISFavorite(true);
  }

  function removeLS() {
    removeLocalStorage(id);
    setISFavorite(false);
  }

  useEffect(() => {
    const xablau = getLocalStorage(id);
    setISFavorite(xablau);
  }, [getLocalStorage, id]);

  function handleChecked({ target }) {
    const li = target.parentNode;
    if (target.checked === true) {
      li.className = 'checked';
    }
    if (target.checked === false) li.className = '';
  }

  function disableButton() {
    const checked = document.querySelectorAll('.checked');
    const inputs = document.querySelectorAll('input');
    if (checked.length + 1 === inputs.length) {
      setDisable(false);
    }
    if (checked.length + 1 !== inputs.length) {
      setDisable(true);
    }
  }

  const filterObj = (text, option) => Object.entries(option)
    .filter(([key, value]) => key.match(text) && value);

  const renderCheckBox = (option) => {
    const ingredients = filterObj(/Ingredient/, option);
    return ingredients.map(([key, ingredient]) => (
      <li key={ `${key}` } data-testid={ `${key}-ingredient-step` }>
        <input
          className="mr-2"
          id="checkbox"
          type="checkbox"
          onChange={ handleChecked }
          onClick={ disableButton }
        />
        {ingredient}
      </li>
    ));
  };

  return (
    <div>
      <img
        className="recipe-image"
        data-testid="recipe-photo"
        src={ drink.strDrinkThumb }
        alt="Foto da receita"
      />
      <p className="alcolico">{drink.strAlcoholic}</p>
      <div className="recipe-container">
        <h1 className="recipe-title" data-testid="recipe-title">{drink.strDrink}</h1>
        <div className="buttons">
          <button type="button" data-testid="share-btn" onClick={ copyURL }>
            <img src={ shareIcon } alt="Compartilhar receita" />
          </button>
          {copy && 'Link copiado!'}
          <button
            type="button"
            onClick={ () => (isFavorite ? removeLS() : setLS()) }
          >
            <img
              data-testid="favorite-btn"
              src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
              alt="Icon Like"
            />
          </button>
        </div>
      </div>
      <p className="recipe-category" data-testid="recipe-category">{drink.strCategory}</p>
      <p className="ingredients">Ingredientes</p>
      <ul>
        {renderCheckBox(drink)}
      </ul>
      <p className="instructions">Instruções</p>
      <p
        className="instructions-details"
        data-testid="instructions"
      >
        {drink.strInstructions}
      </p>
      <button
        data-testid="finish-recipe-btn"
        type="button"
        disabled={ disable }
        className="finish-recipe"
        onClick={ () => history.push('/receitas-feitas') }
      >
        Finalizar Receita
      </button>
    </div>
  );
}

export default DrinkProgress;
