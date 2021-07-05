import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Footer from '../components/Footer';
import Header from '../components/Header';
import CardMeal from '../components/CardMeal';
import CardDrink from '../components/CardDrink';
import { fetchAllDrinks } from '../Service/drinkApi';
import { fetchAllMeals } from '../Service/foodApi';
import RecipesContext from '../Context/RecipesContext';

function MainPage() {
  const { pathname } = useLocation();
  const { setResponseApiLupaMeal, setResponseApiLupaDrink } = useContext(RecipesContext);

  const getApiAll = () => {
    fetchAllDrinks().then((result) => setResponseApiLupaDrink(result));
    fetchAllMeals().then((result) => setResponseApiLupaMeal(result));
  };
  useEffect(getApiAll);
  return (
    <div>
      <Header />
      {(pathname === '/bebidas') ? <CardDrink /> : <CardMeal /> }
      <Footer />
    </div>
  );
}

export default MainPage;
