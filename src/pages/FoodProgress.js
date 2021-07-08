import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import { recipeById } from '../services/requests';
import { filterObj } from '../utils';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import {
  checkFavoriteId,
  updateStorageRecipe,
  getStorageRecipe,
  addRecipeDones,
} from '../services/localStorage';

const blackOrWhite = (favorited) => (favorited ? blackHeartIcon : whiteHeartIcon);

const FoodProgress = ({ match }) => {
  const {
    params: { id },
  } = match;

  const [meal, setMeal] = useState({});
  const [selecteds, setSelects] = useState([]);
  const [msgCopy, setMsgCopy] = useState(false);
  const [iconFavorit, setIconFavorit] = useState(false);
  const [quantIngred, setQuantIngred] = useState();

  const isFavorite = checkFavoriteId(id);

  const qtd = filterObj(/Ingredient/, meal).length;

  useEffect(() => {
    if (isFavorite) setIconFavorit(true);
  }, [isFavorite]);

  useEffect(() => {
    recipeById(id, true).then(setMeal);
    setSelects(getStorageRecipe(id, true) || []);
    setQuantIngred(qtd);
  }, [id, setMeal, qtd]);

  const findSelecteds = (ingredient) => selecteds.find((item) => item === ingredient);

  const handleSelect = (item) => {
    if (!findSelecteds(item)) {
      updateStorageRecipe(id, [...selecteds, item], true);
      setSelects([...selecteds, item]);
    } else {
      const removeSelected = selecteds.filter((ingredient) => ingredient !== item);
      updateStorageRecipe(id, removeSelected, true);
      setSelects(removeSelected);
    }
  };

  const renderCheckBox = () => {
    const ingredients = filterObj(/Ingredient/, meal);
    return ingredients.map(([key, ingredient], idx) => (
      <label
        className={ findSelecteds(key) && 'checked' }
        data-testid={ `${idx}-ingredient-step` }
        htmlFor="ingredient"
        key={ `${key} - ${ingredient}` }
      >
        {ingredient}
        <input
          onClick={ () => handleSelect(key) }
          defaultChecked={ findSelecteds(key) }
          type="checkbox"
          id="ingredient"
        />
      </label>
    ));
  };

  const addFavorite = () => {
    const favorites = localStorage.favoriteRecipes
      ? JSON.parse(localStorage.favoriteRecipes)
      : [];

    if (!iconFavorit) {
      const { idMeal, strArea, strCategory, strMeal, strMealThumb } = meal;
      const add = [
        ...favorites,
        {
          id: idMeal,
          type: 'comida',
          area: strArea,
          category: strCategory,
          alcoholicOrNot: '',
          name: strMeal,
          image: strMealThumb,
        },
      ];
      localStorage.favoriteRecipes = JSON.stringify(add);
    } else {
      const remove = favorites.filter(({ id: idL }) => idL !== id);
      localStorage.favoriteRecipes = JSON.stringify(remove);
    }
    setIconFavorit(!iconFavorit);
  };

  const addRecipeDone = () => {
    const { idMeal, strArea, strCategory, strMeal, strMealThumb, strTags } = meal;
    const recipe = {
      id: idMeal,
      type: 'comida',
      area: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
      doneDate: Date(),
      tags: strTags,
    };
    addRecipeDones(recipe);
  };

  return (
    <div>
      <h2 data-testid="recipe-title">{meal.strMeal}</h2>
      <h3 data-testid="recipe-category">{meal.strCategory}</h3>
      <img data-testid="recipe-photo" src={ meal.strMealThumb } alt={ meal.strMeal } />
      Ingredientes:
      {renderCheckBox()}
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
        {msgCopy ? 'Link copiado!' : 'Compartilhar'}
      </button>
      <button onClick={ addFavorite } type="button">
        <img
          data-testid="favorite-btn"
          src={ blackOrWhite(iconFavorit) }
          alt={ blackOrWhite(iconFavorit) }
        />
      </button>
      <Link to="/receitas-feitas">
        <button
          type="button"
          // disabled={ selecteds.length !== quantIngred }
          data-testid="finish-recipe-btn"
          onClick={ addRecipeDone }
        >
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
