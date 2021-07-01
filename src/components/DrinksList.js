import React, { useContext } from 'react';

import DrinksContext from '../context/drinks.context';
import Card from './Card';

function DrinksList() {
  const MAX_CARDS = 12;
  const { drinks } = useContext(DrinksContext);

  return (
    <div className="card-list">
      {drinks.map((item, index) => {
        if (index < MAX_CARDS) {
          return (
            <Card
              key={ item.idDrink }
              index={ index }
              imgSrc={ item.strDrinkThumb }
              name={ item.strDrink }
              path={ `/bebidas/${item.idDrink}` }
            />
          );
        }
        return null;
      })}
    </div>
  );
}

export default DrinksList;
