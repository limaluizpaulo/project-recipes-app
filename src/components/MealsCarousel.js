import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import MealsContext from '../context/meals.context';

function MealsCarousel() {
  const MAX_CARDS = 6;
  const { meals } = useContext(MealsContext);
  const history = useHistory();

  return (
    <div className="carousel">
      {meals.map((item, index) => {
        if (index < MAX_CARDS) {
          return (
            <button
              type="button"
              className="card"
              key={ item.idMeal }
              onClick={ () => history.push(`/comidas/${item.idMeal}`) }
              data-testid={ `${index}-recomendation-card` }
            >
              <img
                className="card-image"
                src={ item.strMealThumb }
                alt={ item.strMeal }
                data-testid={ `${index}-card-img` }
              />
              <span data-testid={ `${index}-card-name` }>{item.strMeal}</span>
            </button>
          );
        }
        return null;
      })}
    </div>
  );
}

export default MealsCarousel;
