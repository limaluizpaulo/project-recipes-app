import React, { useContext } from 'react';
import { Header, Card, Footer } from '../components';
import { DrinksContext } from '../context/DrinksProvider';

const Drinks = () => {
  const { drinks } = useContext(DrinksContext);

  const recipesShow = 12;
  return (
    <div>
      <Header />
      {drinks.map(({ strMeal, strMealThumb, idMeal }, index) => {
        if (index < recipesShow) {
          return (
            <Card
              key={ idMeal }
              title={ strMeal }
              img={ strMealThumb }
              index={ index }
            />
          );
        }
        return null;
      })}
      <Footer />
    </div>
  );
};

export default Drinks;
