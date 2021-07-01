import React, { useContext } from 'react';
import MealsContext from '../context/meals.context';

function MealsList() {
  const { meals } = useContext(MealsContext);
  const MAX_CARDS = 12;

  return (
    <div className="card-list">
      {meals.map((meal, index) => {
        if (index < MAX_CARDS) {
          return (
            <div
              data-testid={ `${index}-recipe-card` }
              className="card"
              key={ meal.idMeal }
            >
              <img
                data-testid={ `${index}-card-img` }
                className="card-image"
                src={ meal.strMealThumb }
                alt={ meal.strMeal }
              />
              <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

export default MealsList;
