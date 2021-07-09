import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import PropTypes from 'prop-types';
import fetchRecipeByDetails from '../RequisiçõesAPI/food/RequestByDetails';

export default function FoodPrepProgress() {
  const twenty = 20;
  const [recipeDetails, setRecipeDetails] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const handleSelectedFood = async () => {
      const response = await fetchRecipeByDetails(id);
      const result = await response.meals;
      setRecipeDetails(result[0]);
    };
    handleSelectedFood();
  }, []);

  const localStorageFoodInProgress = (preparation, recipeId) => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(
      {
        ...JSON.parse(localStorage.getItem('inProgressRecipes')),
        meals: {
          [recipeId]: preparation,
        },
      },
    ));
  };

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
    if (preparation() !== undefined) {
      localStorageFoodInProgress(preparation(), id);
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
      {/* {console.log(preparation())} */}
    </div>
  );
}

// FoodPrepProgress.propTypes = {
//   recipeId: PropTypes.string.isRequired,
// };
