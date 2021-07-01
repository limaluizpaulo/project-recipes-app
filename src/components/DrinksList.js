import React, { useContext } from 'react';

import DrinksContext from '../context/drinks.context';
import Card from './Card';

function DrinksList() {
  const MAX_CARDS = 12;
  const { drinks, filter } = useContext(DrinksContext);

  let itemsList = [...drinks];
  if (filter) {
    itemsList = drinks.filter((item) => item.strCategory === filter);
  }

  console.log(drinks);
  console.log(filter);
  console.log(itemsList);

  return (
    <div className="card-list">
      {itemsList.map((item, index) => {
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
