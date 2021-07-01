import React, { useContext } from 'react';
import DrinksContext from '../context/drinks.context';

function DrinksList() {
  const { drinks } = useContext(DrinksContext);
  const MAX_CARDS = 12;

  return (
    <div className="card-list">
      {drinks.map((drink, index) => {
        if (index < MAX_CARDS) {
          return (
            <div
              data-testid={ `${index}-recipe-card` }
              className="card"
              key={ drink.idDrink }
            >
              <img
                data-testid={ `${index}-card-img` }
                className="card-image"
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
              />
              <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

export default DrinksList;
