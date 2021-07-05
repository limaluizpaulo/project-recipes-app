import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchRecipeByDetails from '../RequisiçõesAPI/drink/RequestByDetails';

export default function DrinkPreparation({ recipeId }) {
  const fifteen = 15;
  const [recipeDetails, setRecipeDetails] = useState({});

  useEffect(() => {
    const handleSelectedDrink = async () => {
      const response = await fetchRecipeByDetails(recipeId);
      const result = await response.drinks;
      setRecipeDetails(result[0]);
    };
    handleSelectedDrink();
  }, []);

  const preparation = () => {
    const ingredientsList = [];
    for (let index = 1; index <= fifteen; index += 1) {
      if (recipeDetails[`strIngredient${index}`] !== ''
      && recipeDetails[`strIngredient${index}`] !== null
      ) {
        ingredientsList.push(
          `${recipeDetails[`strIngredient${index}`]}: 
            ${recipeDetails[`strMeasure${index}`]}`,
        );
      }
    }
    return ingredientsList;
  };

  return (
    <div>
      { preparation().map((ingredient, index) => (
        <li
          data-testid={ `${index}-ingredient-name-and-measure` }
          key={ index }
        >
          {ingredient}
        </li>
      ))}
    </div>
  );
}

DrinkPreparation.propTypes = {
  recipeId: PropTypes.string.isRequired,
};
