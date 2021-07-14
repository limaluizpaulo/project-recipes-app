import PropTypes from 'prop-types';
import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { useHistory } from 'react-router';
import { changeList,
  copyLink, doneClick, favoriteClick, help } from '../helper/functions';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import useRecipeProgress from '../helper/useRecipeProgress';
import {
  fetchRecipeIDFood, fetchRecipeIDrinks } from '../services/recipeAPI';

export default function RecipeProgress({ idRecipe, typeRecipe }) {
  const [list, setList] = useState([]);
  const [leng, setLeng] = useState([]);
  const [status, setStatus] = useState(true);
  const [detail, setDetail] = useState({});
  const [show, setShow] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [arrayFavorite] = useState(help(JSON.parse(
    localStorage.getItem('favoriteRecipes'),
  ), []));
  const [objectStart] = useState(help(JSON.parse(
    localStorage.getItem('inProgressRecipes'),
  ), { cocktails: {}, meals: {} }));
  const [arrayDone] = useState(help(JSON.parse(
    localStorage.getItem('doneRecipes'),
  ), []));
  const history = useHistory();
  useRecipeProgress({
    idRecipe,
    typeRecipe,
    fetchRecipeIDFood,
    fetchRecipeIDrinks,
    setLeng,
    setList,
    arrayFavorite,
    setFavorite,
    setDetail,
    detail,
    objectStart,
  });

  return (
    <div>
      <img
        width="140"
        alt={ typeRecipe === 'food' ? list.strMeal : list.strDrink }
        src={ typeRecipe === 'food' ? list.strMealThumb : list.strDrinkThumb }
        data-testid="recipe-photo"
      />

      <p
        data-testid="recipe-title"
      >
        { typeRecipe === 'food' ? list.strMeal : list.strDrink }

      </p>
      <img
        style={ { padding: '40px' } }
        role="presentation"
        onClick={ () => copyLink(copy, setShow, typeRecipe, idRecipe) }
        type="button"
        data-testid="share-btn"
        src={ shareIcon }
        alt="Share Icon"
      />
      <p>{show && 'Link copiado!'}</p>
      <img
        style={ { padding: '20px' } }
        src={ favorite ? blackHeartIcon : whiteHeartIcon }
        alt="No Favorite"
        onClick={ () => favoriteClick({
          arrayFavorite, list, favorite, typeRecipe, idRecipe, setFavorite }) }
        type="button"
        role="presentation"
        data-testid="favorite-btn"
      />
      <p data-testid="recipe-category">
        { typeRecipe === 'food' ? list.strCategory : list.strAlcoholic }
      </p>
      <p className="instruction" data-testid="instructions">{list.strInstructions}</p>
      <ul>
        {leng.map((ing, index) => (
          <li
            className="instruction-progress"
            key={ index }
            data-testid={ `${index}-ingredient-step` }
          >
            <input
              onChange={ ({ target }) => changeList({ target },
                { typeRecipe, objectStart, idRecipe, setDetail, detail, setStatus }) }
              type="checkbox"
              checked={ detail[ing] === 'detailClass' }
              value={ ing }
            />
            <label
              htmlFor={ list[ing] }
              className={ detail[ing] }
            >
              {' '}
              {list[ing]}
              -
              {list[`strMeasure${index + 1}`]}
            </label>
          </li>))}
      </ul>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ status }
        onClick={ () => doneClick({ arrayDone, list, typeRecipe, idRecipe, history }) }
      >
        Finalizar Receita
      </button>
    </div>
  );
}

RecipeProgress.propTypes = {
  idRecipe: PropTypes.string,
  typeRecipe: PropTypes.string,
}.isRequired;
