import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import RecipeContext from '../../context/Context';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  updateLocalStorage,
} from '../../services/helpers/localStorage';

const FoodDetails = ({ children }) => {
  const [copied, setCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { selectedFood, createObjectFromFood } = useContext(RecipeContext);
  const { strCategory, strAlcoholic, strInstructions } = selectedFood;
  const recipeId = selectedFood.idMeal || selectedFood.idDrink;

  useEffect(() => {
    const favRecipes = getFromLocalStorage('favoriteRecipes');
    const isFavorited = favRecipes && favRecipes.find(({ id }) => id === recipeId);
    if (isFavorited) setIsFavorite(true);
  }, [selectedFood.idMeal, selectedFood.idDrink, recipeId]);
  const handleShare = () => {
    const ONE_SECOND = 1000;
    const { href } = window.location;
    copy(href);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, ONE_SECOND * 2);
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    const parsedFood = createObjectFromFood();
    if (!isFavorite === true) {
      updateLocalStorage('favoriteRecipes', parsedFood, true);
    } else {
      removeFromLocalStorage('favoriteRecipes', parsedFood);
    }
  };

  const renderImgAndTitle = () => {
    const title = selectedFood.strMeal || selectedFood.strDrink;
    const thumb = selectedFood.strMealThumb || selectedFood.strDrinkThumb;
    return (
      <>
        <img width="360" data-testid="recipe-photo" src={ thumb } alt="" />
        <h1 data-testid="recipe-title">{title}</h1>
      </>
    );
  };
  return (
    <>
      {renderImgAndTitle()}
      <div>
        <button type="button" onClick={ handleShare } data-testid="share-btn">
          <img src={ shareIcon } alt="share icon" />
        </button>
        <button type="button" onClick={ handleFavorite }>
          <img
            data-testid="favorite-btn"
            src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
            alt="share icon"
          />
        </button>
      </div>
      {copied ? <p>Link copiado!</p> : ''}
      <p data-testid="recipe-category">{strAlcoholic || strCategory}</p>
      {children}
      <p data-testid="instructions">
        {strInstructions}
      </p>
    </>
  );
};

FoodDetails.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FoodDetails;
