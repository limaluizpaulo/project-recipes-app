import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    const { location } = window;
    const idIndex = 3;
    const pathname = location.pathname.split('/').slice(1, idIndex).join('/');
    const url = `${location.protocol}//${location.host}/${pathname}`;
    copy(url);
    setCopied(true);
    toast.success('Link copiado!');
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
        <img data-testid="recipe-photo" src={ thumb } alt="" />
        <div className="details__nameCategory__container">
          <h1 className="details__name" data-testid="recipe-title">{title}</h1>
          <p
            className="details__category"
            data-testid="recipe-category"
          >
            {strAlcoholic || strCategory}
          </p>
        </div>
      </>
    );
  };
  return (
    <>
      <div className="details__imgTitle__container">
        {renderImgAndTitle()}
        <div className="details__communityBtns__container">
          <button
            className="details__communityBtns"
            type="button"
            onClick={ handleShare }
            data-testid="share-btn"
          >
            <img src={ shareIcon } alt="share icon" />
          </button>
          <button
            className="details__communityBtns"
            type="button"
            onClick={ handleFavorite }
          >
            <img
              data-testid="favorite-btn"
              src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
              alt="share icon"
            />
          </button>
        </div>
      </div>
      {copied ? <ToastContainer autoClose={ 2000 } /> : ''}
      {children}
      <div className="details__instructions">
        <h3>Instructions</h3>
        <p data-testid="instructions">
          {strInstructions}
        </p>
      </div>
    </>
  );
};

FoodDetails.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FoodDetails;
