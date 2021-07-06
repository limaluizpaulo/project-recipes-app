import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import { recipeById } from '../services/requests';
import { renderCheckBox } from '../utils';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { checkFavoriteId } from '../services/localStorage';

const FoodProgress = ({ match }) => {
  const {
    params: { id },
  } = match;

  const [meal, setMeal] = useState({});
  const [msgCopy, setMsgCopy] = useState(false);
  const [iconFavorit, setIconFavorit] = useState(false);

  const blackOrWhite = () => (iconFavorit ? blackHeartIcon : whiteHeartIcon);

  const isFavorite = checkFavoriteId(id);

  useEffect(() => {
    if (isFavorite) setIconFavorit(true);
  }, [isFavorite]);

  useEffect(() => {
    recipeById(id, true).then(setMeal);
  }, [id, setMeal]);

  const addFavorite = () => {
    const favorites = localStorage.favoriteRecipes
      ? JSON.parse(localStorage.favoriteRecipes) : [];

    if (!iconFavorit) {
      const { idMeal, strArea, strCategory, strMeal, strMealThumb } = meal;
      const add = [...favorites, {
        id: idMeal,
        type: 'comida',
        area: strArea,
        category: strCategory,
        alcoholicOrNot: '',
        name: strMeal,
        image: strMealThumb,
      }];
      localStorage.favoriteRecipes = JSON.stringify(add);
    } else {
      const remove = favorites.filter(({ id: idL }) => idL !== id);
      localStorage.favoriteRecipes = JSON.stringify(remove);
    }
    setIconFavorit(!iconFavorit);
  };

  return (
    <div>
      <h2 data-testid="recipe-title">{meal.strMeal}</h2>
      <h3 data-testid="recipe-category">{meal.strCategory}</h3>
      <img data-testid="recipe-photo" src={ meal.strMealThumb } alt={ meal.strMeal } />
      <ul>
        Ingredientes:
        {renderCheckBox(meal)}
      </ul>
      <p data-testid="video">Video</p>
      <p data-testid="instructions">{meal.strInstructions}</p>
      <p data-testid="0-recomendation-card">recomendation</p>
      <button
        onClick={ () => copy(`http://localhost:3000/comidas/${id}`).then(() => {
          setMsgCopy(true);
        }) }
        type="button"
        data-testid="share-btn"
      >
        { msgCopy ? 'Link copiado!' : 'Compartilhar' }
      </button>
      <button
        onClick={ addFavorite }
        type="button"
      >
        <img data-testid="favorite-btn" src={ blackOrWhite() } alt={ blackOrWhite() } />
      </button>
      <Link to="/receitas-feitas">
        <button disable type="button" data-testid="finish-recipe-btn">
          Finalizar Receita
        </button>
      </Link>
    </div>
  );
};

FoodProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
export default FoodProgress;
