import React, { useContext } from 'react';
import Header from '../components/Header';
import DrinkCard from '../components/DrinkCard';
import { GlobalContext } from '../context/Provider';

const Drinks = () => {
  const { recipes: { drinks = [] } } = useContext(GlobalContext);
  console.log(drinks);

  const renderCard = () => {
    const magic = 12;
    const newRecipes = drinks.filter((_, idx) => idx < magic);
    return newRecipes.map((recipe, idx) => (
      <DrinkCard key={ `${idx} - drink` } recipe={ recipe } index={ idx } />
    ));
  };

  return (
    <div>
      <Header title="Bebidas" search />
      {drinks && renderCard()}
    </div>
  );
};

export default Drinks;
