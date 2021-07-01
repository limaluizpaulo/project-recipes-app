import React, { useContext } from 'react';
import Header from '../components/Header';
import MealCard from '../components/MealCard';
import { GlobalContext } from '../context/Provider';

const Foods = () => {
  const { recipes: { meals = [] } } = useContext(GlobalContext);

  const renderCard = () => {
    const magic = 12;
    const newRecipes = meals.filter((_, idx) => idx < magic);
    return newRecipes.map((recipe, idx) => (
      <MealCard key={ `${idx} - meals` } recipe={ recipe } index={ idx } />
    ));
  };

  return (
    <div>
      <Header title="Comidas" search food />
      {meals && renderCard()}
    </div>
  );
};

export default Foods;
