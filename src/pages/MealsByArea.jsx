import React, { useContext } from 'react';
import { AreasDropDown, Card, Footer, Header } from '../components';
import { MealsContext } from '../context/MealsProvider';

const MealsByArea = () => {
  const { meals } = useContext(MealsContext);

  return (
    <div>
      <Header name="Explorar Origem" search db="meals" />
      <AreasDropDown />
      {meals.map(({ idMeal, strMeal, strMealThumb }, index) => (
        <Card
          id={ idMeal }
          key={ idMeal }
          title={ strMeal }
          img={ strMealThumb }
          index={ index }
          type="comidas"
        />
      ))}
      <Footer />
    </div>
  );
};

export default MealsByArea;
