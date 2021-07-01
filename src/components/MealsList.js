import React, { useContext } from 'react';

import MealsContext from '../context/meals.context';
import Card from './Card';

function MealsList() {
  const MAX_CARDS = 12;
  const { meals, filter } = useContext(MealsContext);

  let itemsList = [...meals];
  if (filter) {
    itemsList = meals.filter((item) => item.strCategory === filter);
  }

  return (
    <div className="card-list">
      {itemsList.map((item, index) => {
        if (index < MAX_CARDS) {
          return (
            <Card
              key={ item.idMeal }
              index={ index }
              imgSrc={ item.strMealThumb }
              name={ item.strMeal }
              path={ `/comidas/${item.idMeal}` }
            />
          );
        }
        return null;
      })}
    </div>
  );
}

export default MealsList;
