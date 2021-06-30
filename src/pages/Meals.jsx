import React, { useContext } from 'react';
import { Header, Categories, Card, Footer } from '../components';
import { MealsContext } from '../context/MealsProvider';

const Meals = () => {
  const {
    meals,
    categories,
    setFilterCategory,
  } = useContext(MealsContext);

  const recipesShow = 12;
  return (
    <div>
      <Header />
      <Categories
        categories={ categories }
        onClick={ setFilterCategory }
      />
      {meals.map(({ strMeal, strMealThumb, idMeal }, index) => {
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

export default Meals;
