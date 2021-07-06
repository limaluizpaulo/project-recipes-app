import React from 'react';

const IngredientCard = ({ type, ingredient, index }) => (
  <div data-testid={ `${index}-ingredient-card` }>
    <img
      src={ `https://www.the${type}db.com/images/ingredients/${ingredient}-Small.png` }
      alt=""
      data-testid={ `${index}-card-img` }
    />
    <h4 data-testid={ `${index}-card-name` }>
      {ingredient}
    </h4>
  </div>
);

export default IngredientCard;
