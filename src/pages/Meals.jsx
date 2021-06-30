import React, { useContext } from 'react';
import { Header, Categories, Card, Footer } from '../components';
import { MealsContext } from '../context/MealsProvider';
import fetchFilteredByCategory from '../services/api/fetchFilteredByCategory';

const Meals = () => {
  const { meals, setMeals, categories } = useContext(MealsContext);

  const recipesShow = 12;
  return (
    <div>
      <Header />
      <Categories
        categories={ categories }
        onClick={ async ({ target: { id } }) => {
          const filtered = await fetchFilteredByCategory('meals', id);
          setMeals(filtered);
        } }
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
