import React, { useContext } from 'react';
import { Header, Card, Footer } from '../components';
import { DrinksContext } from '../context/DrinksProvider';

const Drinks = () => {
  const { drinks } = useContext(DrinksContext);

  const recipesShow = 12;
  return (
    <div>
      <Header />
      {drinks.map(({ strDrink, strDrinkThumb, idDrink }, index) => {
        if (index < recipesShow) {
          return (
            <Card
              key={ idDrink }
              title={ strDrink }
              img={ strDrinkThumb }
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
