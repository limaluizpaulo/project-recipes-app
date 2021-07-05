import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Header, Categories, Card, Footer } from '../components';
import { DrinksContext } from '../context/DrinksProvider';

const Drinks = () => {
  const { drinks, categories, setFilterCategory } = useContext(DrinksContext);

  const recipesShow = 12;
  return (
    <div>
      <Header name="Bebidas" db="drinks" />
      <Categories
        categories={ categories }
        onClick={ setFilterCategory }
      />
      {drinks.length === 1 && <Redirect to={ `bebidas/${drinks[0].idDrink}` } />}
      {drinks.map(({ idDrink, strDrink, strDrinkThumb }, index) => {
        if (index < recipesShow) {
          return (
            <Card
              id={ idDrink }
              key={ idDrink }
              title={ strDrink }
              img={ strDrinkThumb }
              index={ index }
              type="bebidas"
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
