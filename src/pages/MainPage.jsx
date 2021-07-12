import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { fetchAllDrinks } from '../Service/drinkApi';
import { fetchAllMeals } from '../Service/foodApi';
import RecipesContext from '../Context/RecipesContext';

import Footer from '../components/Footer';
import Header from '../components/Header';
import CardMeal from '../components/CardMeal';
import CardDrink from '../components/CardDrink';

function MainPage() {
  const { pathname } = useLocation();
  const { responseApiLupaMeal, setResponseApiLupaMeal,
    resposeApiLupaDrink, setResponseApiLupaDrink,
  } = useContext(RecipesContext);

  const getApiAll = () => {
    if (responseApiLupaMeal.length === 0 || resposeApiLupaDrink.length === 0) {
      console.log('cheguei');
      fetchAllDrinks().then((result) => setResponseApiLupaDrink(result));
      fetchAllMeals().then((result) => setResponseApiLupaMeal(result));
    }
  };

  useEffect(getApiAll, []);
  return (
    <div>
      <Header />
      {pathname.includes('/bebidas') ? <CardDrink /> : <CardMeal /> }
      <Footer />
    </div>
  );
}

export default MainPage;
