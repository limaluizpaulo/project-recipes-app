import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import DrinksContext from '../context/drinks.context';

function DrinksList() {
  const MAX_CARDS = 12;
  const { drinks } = useContext(DrinksContext);
  const history = useHistory();

  return (
    <div className="card-list">
      {drinks.map((item, index) => {
        if (index < MAX_CARDS) {
          return (
            <button
              type="button"
              className="card"
              key={ item.idDrink }
              onClick={ () => history.push(`/bebidas/${item.idDrink}`) }
              data-testid={ `${index}-recipe-card` }
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

export default DrinksList;