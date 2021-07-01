import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import DrinksContext from '../context/drinks.context';

function DrinksList() {
  const { drinks, category } = useContext(DrinksContext);
  const MAX_CARDS = 12;
  const history = useHistory();
  let itensList = [...drinks];

  if (category) {
    itensList = drinks.filter((item) => item.strCategory === category);
  }

  return (
    <div className="card-list">
      {itensList.map((drink, index) => {
        if (index < MAX_CARDS) {
          return (
            <button
              onClick={ () => history.push(`/bebidas/${drink.idDrink}`) }
              type="button"
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
            </button>
          );
        }
        return null;
      })}
    </div>
  );
}

export default DrinksList;
