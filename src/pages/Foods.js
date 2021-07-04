import React, { useContext } from 'react';
import Header from '../components/Header';
import { GlobalContext } from '../context/Provider';
import Footer from '../components/Footer';
import Categories from '../components/Categories';
import { renderCard } from '../utils';

const Foods = () => {
  const {
    meals: defaultMeals,
    recipes: { meals = [] },
  } = useContext(GlobalContext);

  return (
    <div>
      <Header title="Comidas" search food />
      <Categories food />
      <div className="grade">{renderCard(meals, defaultMeals)}</div>
      <Footer />
    </div>
  );
};

export default Foods;
