import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import MealsContext from '../context/meals.context';

function MealsList() {
  const { meals, category } = useContext(MealsContext);
  const MAX_CARDS = 12;
  const history = useHistory();
  let itensList = [...meals];

  if (category) {
    itensList = meals.filter((item) => item.strCategory === category);
  }

  return (
    <div className="card-list">
      {itensList.map((meal, index) => {
        if (index < MAX_CARDS) {
          return (
            <button
              type="button"
              onClick={ () => history.push(`/comidas/${meal.idMeal}`) }
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
            </button>
          );
        }
        return null;
      })}
    </div>
  );
}

export default MealsList;
