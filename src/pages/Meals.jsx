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
      {meals.map(({ idMeal, strMeal, strMealThumb }, index) => {
        if (index < recipesShow) {
          return (
            <Card
              id={ idMeal }
              key={ idMeal }
              title={ strMeal }
              img={ strMealThumb }
              index={ index }
              type="comidas"
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
