import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router';
import copyRecipe from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { fetchDrinkById } from '../services/DrinksServices';

import LoginContext from '../context/LoginContext';

import {
  PageDetails,
  Header,
  Thumb,
  Popup,
  Ingredients,
  Instructions,
} from '../styles/Details';

import { BtnEndRecipe } from '../styles/InProgress';

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

  function buttonShare() {
    return (
      <button
        type="button"
        data-testid="share-btn"
        onClick={ copyURL }
      >
        <img src={ shareIcon } alt="Compartilhar receita" />
      </button>
    );
  }

  function buttonLike() {
    return (
      <button
        type="button"
        onClick={ () => (isFavorite ? removeLS() : setLS()) }
      >
        <img
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt="Icon Like"
          data-testid="favorite-btn"
        />
      </button>
    );
  }

  return (
    <PageDetails>
      <Header>
        <Thumb
          data-testid="recipe-photo"
          src={ drink.strDrinkThumb }
          alt="Foto da receita"
        />
        <section>
          <div>
            <h1 data-testid="recipe-title">
              { drink.strDrink}
            </h1>
            <h2 data-testid="recipe-category">
              { drink.strAlcoholic }
            </h2>
          </div>

          <section>
            { buttonShare() }
            <Popup
              copied={ copy }
              onTransitionEnd={ () => setCopy(false) }
            >
              Link copiado!
            </Popup>
            { buttonLike() }
          </section>
        </section>
      </Header>
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
          onClick={ () => history.push('/receitas-feitas') }
        >
          Finalizar Receita
        </BtnEndRecipe>
      </div>
    </PageDetails>
  );
}

export default DrinkProgress;
