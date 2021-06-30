import React, { useContext } from 'react';

import RecipeContext from '../context/Context';
import '../styles/foodDetails.css';

const AlternativesCaroussel = () => {
  const { selectedFood } = useContext(RecipeContext);
  const { alternatives } = selectedFood;
  console.log(alternatives);
  const renderAlternatives = () => alternatives.map((alternative, index) => {
    const name = alternative.strMeal || alternative.strDrink;
    const category = alternative.strCategory || alternative.strAlcoholic;
    const image = alternative.strMealThumb || alternative.strDrinkThumb;
    return (
      <div
        key={ index }
        data-testid={ `${index}-recomendation-card` }
        className="foodDetails__alternative__card"
      >
        <img src={ image } width="100" alt={ name } />
        <p>{category}</p>
        <p data-testid={ `${index}-recomendation-title` }>{name}</p>
      </div>
    );
  });
  return (
    <div className="foodDetails__alternatives">
      {renderAlternatives()}
    </div>
  );
};

export default AlternativesCaroussel;
