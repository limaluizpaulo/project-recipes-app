import React, { useContext, useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useRouteMatch } from 'react-router-dom';

import RecipesContext from '../context/RecipesContext';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

export default function InProgress() {
  const { path } = useRouteMatch();
  const { inProgress, setInProgress } = useContext(RecipesContext);
  const [validateCheckBox, setValidateCheckBox] = useState(0);
  const [idCheckBox, setIDCheckBox] = useState([]);
  const [isDisabled, setDisabled] = useState(true);

  const imgSrc = path.includes('comidas') ? 'strMealThumb' : 'strDrinkThumb';
  const title = path.includes('comidas') ? 'strMeal' : 'strDrink';

  useEffect(() => {
    if (inProgress[0]) {
      if (validateCheckBox === inProgress[0].length) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }
  }, [validateCheckBox, inProgress]);

  function handleCheckBox({ target }) {
    const { id } = target;

    if (idCheckBox.includes(id)) {
      target.parentNode.className = '';
      setIDCheckBox(idCheckBox.filter((nmID) => nmID !== id));
      setValidateCheckBox(validateCheckBox - 1);
    } else {
      target.parentNode.className = 'done';
      setIDCheckBox([...idCheckBox, id]);
      setValidateCheckBox(validateCheckBox + 1);
    }
  }

  function handleFinished() {
    setInProgress([]);
  }

  if (inProgress.length === 0) return <h1>Upss... Try again!!</h1>;
  return (
    <>
      <img
        data-testid="recipe-photo"
        src={ inProgress[1][imgSrc] }
        alt={ inProgress[1][title] }
      />

      <p data-testid="recipe-title">{inProgress[1][title]}</p>

      <Button>
        <img data-testid="share-btn" src={ shareIcon } alt="" />
      </Button>

      <Button>
        <img data-testid="favorite-btn" src={ whiteHeartIcon } alt="" />
      </Button>

      <p data-testid="recipe-category">{ inProgress[1].strCategory }</p>

      {inProgress[0].map((item, i) => (
        <label key={ item } htmlFor={ `${i}-ingredient-step` }>
          <p
            data-testid={ `${i}-ingredient-step` }
          >
            <input
              id={ `${i}-ingredient-step` }
              name={ `step-${i + 1}` }
              type="checkbox"
              value={ false }
              className=""
              onChange={ handleCheckBox }
            />
            {` ${item}`}
          </p>
        </label>
      ))}

      <p data-testid="instructions">{ inProgress[1].strInstructions }</p>

      <Button
        data-testid="finish-recipe-btn"
        onClick={ handleFinished }
        disabled={ isDisabled }
      >
        Finalizar Receita
      </Button>
    </>
  );
}
