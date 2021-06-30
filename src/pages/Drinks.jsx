import React, { useContext } from 'react';
import { Header, Categories, Card, Footer } from '../components';
import { DrinksContext } from '../context/DrinksProvider';

const Drinks = () => {
  const { drinks, categories, setFilterCategory } = useContext(DrinksContext);

  const recipesShow = 12;
  return (
    <div>
      <Header />
      <Categories
        categories={ categories }
        onClick={ setFilterCategory }
      />
      {drinks.map(({ idDrink, strDrink, strDrinkThumb }, index) => {
        if (index < recipesShow) {
          return (
            <Card
              id={ idDrink }
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
