import React, { useContext } from 'react';
import { Header, Categories, Card, Footer } from '../components';
import { DrinksContext } from '../context/DrinksProvider';
import fetchFilteredByCategory from '../services/api/fetchFilteredByCategory';

const Drinks = () => {
  const { drinks, setDrinks, categories } = useContext(DrinksContext);

  const recipesShow = 12;
  return (
    <div>
      <Header />
      <Categories
        categories={ categories }
        onClick={ async ({ target: { id } }) => {
          const filtered = await fetchFilteredByCategory('drinks', id);
          setDrinks(filtered);
        } }
      />
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
