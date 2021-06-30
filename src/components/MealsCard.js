import React, { useContext } from 'react';
import MealsContext from '../context/meals.context';

function MealsCard() {
  const { meals } = useContext(MealsContext);
  const MAX_CARDS = 12;

  return (
    <div>
      {meals.map((meal, index) => {
        if (index < MAX_CARDS) {
          return (
            <div data-testid={ `${index}-recipe-card` } key={ meal.idMeal }>
              <img
                data-testid={ `${index}-card-img` }
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

export default MealsCard;
