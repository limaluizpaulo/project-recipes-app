import React, { useContext } from 'react';
import DrinksContext from '../context/drinks.context';

function DrinksCard() {
  const { drinks } = useContext(DrinksContext);
  const MAX_CARDS = 12;

  return (
    <div>
      {drinks.map((drink, index) => {
        if (index < MAX_CARDS) {
          return (
            <div data-testid={ `${index}-recipe-card` } key={ drink.idDrink }>
              <img
                data-testid={ `${index}-card-img` }
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

export default DrinksCard;
