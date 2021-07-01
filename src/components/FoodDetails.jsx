import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from '../context/Context';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const FoodDetails = ({ children }) => {
  const { selectedFood } = useContext(RecipeContext);
  const { strCategory, strAlcoholic, strInstructions } = selectedFood;
  const renderImgAndTitle = () => {
    const { strMealThumb, strMeal } = selectedFood;
    if (!strMealThumb) {
      const { strDrinkThumb, strDrink } = selectedFood;
      return (
        <>
          <img width="360" data-testid="recipe-photo" src={ strDrinkThumb } alt="" />
          <h1 data-testid="recipe-title">{strDrink}</h1>
        </>
      );
    }
    return (
      <>
        <img width="360" data-testid="recipe-photo" src={ strMealThumb } alt="" />
        <h1 data-testid="recipe-title">{strMeal}</h1>
      </>
    );
  };
  return (
    <>
      {renderImgAndTitle()}
      <div>
        <button type="button" data-testid="share-btn">
          <img src={ shareIcon } alt="share icon" />
        </button>
        <button type="button" data-testid="favorite-btn">
          <img src={ whiteHeartIcon } alt="share icon" />
        </button>
      </div>
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
