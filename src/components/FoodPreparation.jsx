import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchRecipeByDetails from '../RequisiçõesAPI/food/RequestByDetails';

export default function FoodPreparation({ recipeId }) {
  const twenty = 20;
  const [recipeDetails, setRecipeDetails] = useState({});

  useEffect(() => {
    const handleSelectedFood = async () => {
      const response = await fetchRecipeByDetails(recipeId);
      const result = await response.meals;
      setRecipeDetails(result[0]);
    };
    handleSelectedFood();
  }, []);

  // Source https://stackoverflow.com/questions/49580528/how-to-filter-through-json-return-from-api-with-similar-prop
  const preparation = () => {
    const ingredientsList = [];
    for (let index = 1; index <= twenty; index += 1) {
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

  useEffect(() => {
    preparation();
  }, []);

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

FoodPreparation.propTypes = {
  recipeId: PropTypes.string.isRequired,
};
