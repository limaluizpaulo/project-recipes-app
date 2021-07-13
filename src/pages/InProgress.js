import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useParams, useRouteMatch, useHistory } from 'react-router-dom';

import { getDataById } from '../services/apiRequest';
import { saveFinished } from '../storage/localStorage';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

export default function InProgress() {
  const { path } = useRouteMatch();
  const { id } = useParams();
  const history = useHistory();

  const [validateCheckBox, setValidateCheckBox] = useState(0);
  const [nmCheckBox, setNmCheckBox] = useState([]);
  const [isDisabled, setDisabled] = useState(true);
  const [renderer, setRenderer] = useState([]);
  const [ingredientsList, setIngridientsList] = useState([]);

  const [domain, firstKey, imgSrc, title] = path.includes('comidas')
    ? ['themealdb', 'meals', 'strMealThumb', 'strMeal']
    : ['thecocktaildb', 'drinks', 'strDrinkThumb', 'strDrink'];

  useEffect(() => {
    getDataById(domain, id).then((res) => {
      setRenderer(res[firstKey]);

      const list = Object.entries(res[firstKey][0]).filter((el) => (
        (el[0].includes('Ingredient')
          || el[0].includes('Measure')) && el[1]) && el[1] !== ' ');

      setIngridientsList(list);
    });
  }, [id, domain, firstKey]);

  function handleIngredientsData() {
    return ingredientsList.map((el, i, arr) => (
      (el[0].includes('Ingredient')) && ([`${el[1]
        + arr.filter((elt) => elt[0] === (`strMeasure${i + 1}`))
          .map((result) => (` - ${result[1]}`))}`,
      ]))).filter((fil) => fil);
  }

  const listFormated = handleIngredientsData();
  useEffect(() => {
    if (validateCheckBox === listFormated.length) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [listFormated.length, validateCheckBox]);

  function handleCheckBox({ target }) {
    const { name } = target;

    if (nmCheckBox.includes(name)) {
      target.parentNode.className = '';
      setNmCheckBox(nmCheckBox.filter((nm) => nm !== name));
      setValidateCheckBox(validateCheckBox - 1);
    } else {
      target.parentNode.className = 'done';
      setNmCheckBox([...nmCheckBox, name]);
      setValidateCheckBox(validateCheckBox + 1);
    }
  }

  function handleShare() {
    return global.alert('Link copiado!');
  }

  function handleFinished() {
    const date = new Date();
    saveFinished(renderer[0], path, date);
    history.push('/receitas-feitas');
  }
  if (!renderer[0]) return <h1>Loading...</h1>;
  return (
    <>
      <img
        data-testid="recipe-photo"
        src={ renderer[0][imgSrc] }
        alt={ renderer[0][title] }
      />

      <p data-testid="recipe-title">{renderer[0][title]}</p>

      <Button onClick={ handleShare }>
        <img data-testid="share-btn" src={ shareIcon } alt="" />
      </Button>

      <Button>
        <img data-testid="favorite-btn" src={ whiteHeartIcon } alt="" />
      </Button>

      <p data-testid="recipe-category">{ renderer[0].strCategory }</p>

      {handleIngredientsData().map((item, i) => (
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

      <p data-testid="instructions">{ renderer[0].strInstructions }</p>

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
