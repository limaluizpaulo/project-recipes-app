import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import DrinksContext from '../context/drinks.context';

function DrinksCarousel() {
  const MAX_CARDS = 6;
  const { drinks } = useContext(DrinksContext);
  const history = useHistory();

  return (
    <div className="carousel">
      {drinks.map((item, index) => {
        if (index < MAX_CARDS) {
          // console.log(item, index);
          return (
            <button
              type="button"
              className="card"
              key={ index }
              onClick={ () => history.push(`/bebidas/${item.idDrink}`) }
              data-testid={ `${index}-recomendation-card` }
            >
              <img
                className="card-image"
                src={ item.strDrinkThumb }
                alt={ item.strDrink }
                data-testid={ `${index}-card-img` }
              />
              <span data-testid={ `${index}-card-name` }>{item.strDrink}</span>
            </button>
          );
        }
        return null;
      })}
    </div>
  );
}

export default DrinksCarousel;
