import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import PropTypes from 'prop-types';
import fetchRecipeByDetails from '../RequisiçõesAPI/drink/RequestByDetails';

export default function DrinkPrepProgress() {
  const fifteen = 15;
  const [recipeDetails, setRecipeDetails] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const handleSelectedDrink = async () => {
      const response = await fetchRecipeByDetails(id);
      const result = await response.drinks;
      setRecipeDetails(result[0]);
    };
    handleSelectedDrink();
  }, []);

  const localStorageDrinkInProgress = (preparation, recipeId) => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(
      {
        ...JSON.parse(localStorage.getItem('inProgressRecipes')),
        cocktails: {
          [recipeId]: preparation,
        },
      },
    ));
  };

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

  useEffect(() => {
    if (preparation() !== undefined) {
      localStorageDrinkInProgress(preparation(), id);
      console.log(preparation());
    }
    // const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    // if (storage !== null && storage.find((favoriteId) => favoriteId.id === id)) {
    //   setIsFavorite(true);
    // }
  }, [preparation()]);

  return (
    <div>
      { preparation().map((ingredient, index) => (
        <div key={ index }>
          <label
            htmlFor={ index }
            data-testid={ `${index}-ingredient-step` }
          >
            <input
              type="checkbox"
              data-testid={ `${index}-ingredient-name-and-measure` }
              id={ index }

            />
            {ingredient}
          </label>
        </div>

      ))}
    </div>
  );
}
